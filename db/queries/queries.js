const retrieveProfileByEmail = (email, pool) =>
  pool
    .query({
      text: `SELECT id, first_name, last_name, bio, avatar, pass FROM users WHERE email = $1`,
      values: [email]
    })
    .then(res => res.rows);

const registerNewUser = (email, firstName, lastName, pass, pool) =>
  pool
    .query({
      text: `INSERT INTO users(email, first_name,last_name, pass) VALUES($1, $2, $3, $4)`,
      values: [email, firstName, lastName, pass]
    })
    .then(() => {
      return pool.query({
        text: `SELECT id FROM users WHERE email = $1`,
        values: [email]
      });
    })
    .then(res => res.rows[0]);

const retrieveJoinedEvents = (user_id, pool) => {
  let response;
  return pool
    .query({
      text: `SELECT event_id, admin, participants.joined_time,
        name, location, picture, description, start_time, end_time, creator_id, created_time,
        first_name, last_name, bio, avatar, background
        FROM participants
        JOIN events ON events.id = event_id
        JOIN users ON users.id = creator_id
        WHERE user_id = $1
        ORDER BY start_time ASC`,
      values: [user_id]
    })
    .then(res1 => res1.rows)
    .then(res2 => {
      response = res2;
      return retrieveParticipantsMultiple(res2.map(e => e.event_id), pool);
    })
    .then(res3 => {
      return response.map((e, i) => {
        return { ...e, participants: res3[i] };
      });
    });
};

const retrieveParticipantsMultiple = async (event_id_list, pool) => {
  let output = [];
  for (e of event_id_list) {
    output.push(await retrieveParticipants(e, pool));
  }
  return output;
};

const retrieveParticipants = (event_id, pool) => {
  return pool
    .query({
      text: `SELECT user_id, first_name, last_name, bio, avatar, background, participants.joined_time
      FROM participants
      JOIN users ON users.id = user_id
      WHERE event_id = $1
      ORDER BY participants.joined_time DESC`,
      values: [event_id]
    })
    .then(res => res.rows);
};

const addEvent = (data, pool) =>
  pool
    .query({
      text: `INSERT INTO events
      (creator_id, name, picture, description, location, start_time, end_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`,
      values: [
        data.creatorId,
        data.name,
        data.picture,
        data.description,
        data.location,
        data.startTime,
        data.endTime
      ]
    })
    .then(res =>
      pool.query({
        text: `INSERT INTO participants
      (user_id, event_id, admin)
      VALUES ($1, $2, $3)`,
        values: [data.creatorId, res.rows[0].id, true]
      })
    );

const discoverEvents = (id, pool) => {
  let response;
  return pool
    .query({
      text: `SELECT e.id, creator_id, name, picture, description, location, start_time, end_time, created_time,
      first_name, last_name, bio, avatar, background
      FROM events e
      JOIN users ON users.id = creator_id
      WHERE start_time > now()
      AND NOT EXISTS (SELECT 1 FROM participants p JOIN events ON p.event_id = e.id WHERE user_id = $1)
      ORDER BY start_time ASC`,
      values: [id]
    })
    .then(res1 => res1.rows)
    .then(res2 => {
      response = res2;
      return retrieveParticipantsMultiple(res2.map(e => e.id), pool);
    })
    .then(res3 =>
      response.map((e, i) => {
        return { ...e, participants: res3[i] };
      })
    );
};

const leaveEvent = (data, pool) =>
  pool.query({
    text: `DELETE FROM participants WHERE user_id = $1 AND event_id = $2`,
    values: [data.user_id, data.event_id]
  });

const joinEvent = (data, pool) =>
  retrieveParticipants(data.event_id, pool).then(res => {
    if (res.map(e => e.user_id).includes(data.user_id)) {
      return null;
    } else {
      return pool.query({
        text: `INSERT INTO participants (user_id, event_id, admin) VALUES ($1, $2, $3)`,
        values: [data.user_id, data.event_id, res.length ? false : true]
      });
    }
  });

const retrieveEditableEventData = (event_id, pool) =>
  Promise.all([
    pool.query({
      text: `SELECT name, picture, description, location, start_time, end_time
        FROM events
        WHERE id = $1`,
      values: [event_id]
    }),
    retrieveParticipants(event_id, pool)
  ]).then(res => {
    return { details: res[0].rows[0], participants: res[1] };
  });

const editEvent = (data, pool) =>
  pool.query({
    text: `UPDATE events
    SET start_time = $1, end_time = $2, name = $3, picture = $4, description = $5, location = $6
    WHERE id = $7`,
    values: [
      data.start,
      data.end,
      data.name,
      data.picture,
      data.description,
      data.location,
      data.id
    ]
  });

const searchEvent = (key, pool) => {
  let response;
  return pool
    .query({
      text: `SELECT events.id, creator_id, name, picture, description, location, start_time, end_time, created_time,
      first_name, last_name, bio, avatar, background
      FROM events
      JOIN users ON users.id = creator_id
      WHERE name ILIKE $1
      OR description ILIKE $1
      OR location ILIKE $1`,
      values: [`%${key}%`]
    })
    .then(res1 => res1.rows)
    .then(res2 => {
      response = res2;
      return retrieveParticipantsMultiple(res2.map(e => e.id), pool);
    })
    .then(res3 =>
      response.map((e, i) => {
        return { ...e, participants: res3[i] };
      })
    );
};

module.exports = {
  retrieveProfileByEmail,
  registerNewUser,
  retrieveJoinedEvents,
  addEvent,
  discoverEvents,
  leaveEvent,
  joinEvent,
  retrieveEditableEventData,
  editEvent,
  searchEvent
};
