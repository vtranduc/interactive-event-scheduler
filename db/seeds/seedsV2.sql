-- insert into users
--   ( email,first_name, last_name, bio, pass, avatar)
-- values
--   ('a', 'Nozomi', 'Tojo', 'Washi washi max!', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'https://66.media.tumblr.com/5b911b80164d826bd049731a1560b003/tumblr_p6321645Qj1wjwbano4_500.png');
insert into users
  ( email,first_name, last_name, bio, pass, avatar)
values
  ('a', 'John', 'Tojo', 'Hi all! This is John!', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'https://media.giphy.com/media/l3V0x6kdXUW9M4ONq/giphy.gif');

insert into users
  ( email,first_name, last_name, bio, pass, avatar)
values
  ('b', 'Mary', 'Ayase', 'third year and a member of Bibi', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'https://media.giphy.com/media/1442OZn3sn50kw/giphy.gif');
insert into users
  ( email,first_name, last_name, bio, pass, avatar)
values
  ('c', 'Josh', 'Yazawa', 'An aspiring doctor', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'http://giphygifs.s3.amazonaws.com/media/p4xp4BjHIdane/giphy.gif');
insert into users
  ( email,first_name, last_name, bio, pass, avatar, background)
values
  ('d', 'Anna', 'Kousaka', 'Student currently studying computing science in U of T', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'https://media.giphy.com/media/ET5QsE8329VM4/giphy.gif', 'https://media.giphy.com/media/PU9ae3tuWoJCU/giphy.gif');
insert into users
  ( email,first_name, last_name, bio, pass, avatar)
values
  ('e', 'Martin', 'Minami', 'Typical photographer', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'https://media.giphy.com/media/OK5LK5zLFfdm/giphy.gif');
insert into users
  ( email,first_name, last_name, bio, pass, avatar)
values
  ('f', 'Selin', 'Sonoda', 'Traveler, blogger', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'https://media.giphy.com/media/AxVvjOTeDz1EhGVfHy/giphy.gif');
insert into users
  ( email,first_name, last_name, bio, pass, avatar)
values
  ('g', 'Jay', 'Hoshizora', 'Drake fan', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif');
insert into users
  ( email,first_name, last_name, bio, pass, avatar)
values
  ('h', 'Sara', 'Hanayo', 'I like to play basketball!', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'https://media.giphy.com/media/lqMg6hf8Mie9cvsrmi/giphy.gif');
insert into users
  ( email,first_name, last_name, bio, pass, avatar, background)
values
  ('i', 'Tyler', 'Nishikino', 'I can speak 5 languages', '$2b$10$M4bpbpo1YEr2V/wHzmFOSuR1zysvEclArkPIro3hiIVlg6Rfoaumi', 'https://media.giphy.com/media/QZ0UB3nJtVNn2/giphy.gif', 'https://images2.alphacoders.com/825/82580.jpg');

insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (4, 'Eleven-banded armadillo (unidentified)', 'https://images4.alphacoders.com/576/576566.jpg', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.

Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Lynn', '2019-01-15 16:32:49', '2019-08-06 19:08:46');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (5, 'Purple grenadier', 'https://images3.alphacoders.com/837/83725.jpg', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 'Delanggu', '2018-09-29 22:21:50', '2019-08-29 00:53:21');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (2, 'Yellow-billed stork', 'https://images4.alphacoders.com/920/920077.jpg', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'Babao', '2019-01-26 16:24:23', '2019-07-10 10:57:35');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (1, 'Galapagos mockingbird', 'https://images4.alphacoders.com/987/987585.jpg', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 'Sanchahe', '2019-01-10 20:28:20', '2019-09-07 14:09:04');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (4, 'Gray duiker', 'https://images4.alphacoders.com/903/903637.jpg', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.

Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 'Kostryzhivka', '2019-05-09 18:47:12', '2019-06-18 05:11:33');

-- Current events --

insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (2, 'Plover, three-banded', 'https://images5.alphacoders.com/329/329726.jpg', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 'Curridabat', '2019-04-24 21:37:06', '2019-11-22 11:27:19');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (2, 'Lion, galapagos sea', 'https://images2.alphacoders.com/112/112080.jpg', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.

Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.

Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 'Pasłęk', '2018-10-02 04:48:15', '2019-11-24 11:21:55');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (2, 'Marmot, hoary', 'https://images4.alphacoders.com/193/19334.jpg', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.

Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 'Licun', '2019-06-05 16:15:33', '2019-12-24 19:18:51');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (2, 'Booby, blue-footed', 'https://images8.alphacoders.com/368/368165.jpg', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.

Phasellus in felis. Donec semper sapien a libero. Nam dui.

Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 'Mompós', '2019-07-13 08:37:14', '2019-11-01 00:31:08');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (2, 'Roller, lilac-breasted', 'https://images4.alphacoders.com/805/80576.jpg', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 'Tianyi', '2019-06-03 14:46:23', '2019-11-05 23:57:11');

-- Future events --

insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (6, 'Heron, goliath', 'https://images3.alphacoders.com/514/51459.jpg', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 'Petrodvorets', '2019-10-11 05:14:48', '2020-01-22 01:07:32');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (5, 'Egret, great', 'https://images3.alphacoders.com/648/64875.jpg', 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.

Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 'New York', '2019-10-21 19:48:29', '2020-02-25 13:50:57');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (4, 'Piano concert by Larry', 'https://images5.alphacoders.com/318/318227.jpg', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.

Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'New York', '2019-10-29 09:29:38', '2020-02-10 01:54:11');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (3, 'Youth piano movement', 'https://images7.alphacoders.com/330/330678.jpg', 'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.', 'Luna', '2019-11-01 03:29:09', '2020-03-26 21:35:02');
insert into events
  (creator_id, name, picture, description, location, start_time, end_time)
values
  (8, 'Teal, hottentot', 'https://images8.alphacoders.com/497/497118.jpg', 'This is a piano concert. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 'Toronto', '2019-11-17 13:52:21', '2020-03-28 20:30:07');


-- This is the end of events data --

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------


insert into participants
  (user_id, event_id, admin, joined_time)
values
  (7, 1, true, '2019-09-19 02:32:52');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (1, 1, false, '2019-08-12 00:53:39');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (4, 1, true, '2019-09-22 04:58:02');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (9, 1, true, '2019-08-26 05:44:12');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (3, 1, true, '2019-08-07 15:35:09');

insert into participants
  (user_id, event_id, admin, joined_time)
values
  (9, 4, true, '2019-08-15 13:48:38');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (6, 4, false, '2019-09-10 12:00:36');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (5, 5, true, '2019-08-08 19:24:00');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (7, 3, false, '2019-08-23 08:30:57');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (1, 3, true, '2019-08-18 19:49:26');

insert into participants
  (user_id, event_id, admin, joined_time)
values
  (9, 6, true, '2019-08-14 03:38:21');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (6, 6, true, '2019-09-10 21:22:27');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (1, 6, false, '2019-09-01 08:16:00');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (8, 6, false, '2019-09-16 23:48:11');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (4, 6, false, '2019-08-03 05:51:13');

insert into participants
  (user_id, event_id, admin, joined_time)
values
  (7, 7, true, '2019-08-01 00:45:46');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (3, 7, false, '2019-09-21 00:24:50');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (9, 7, false, '2019-08-13 06:20:21');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (1, 7, true, '2019-08-01 20:00:01');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (8, 7, false, '2019-08-29 19:22:07');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (2, 7, false, '2019-08-24 16:30:54');

insert into participants
  (user_id, event_id, admin, joined_time)
values
  (7, 9, true, '2019-09-20 16:07:42');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (8, 11, true, '2019-09-14 08:37:16');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (3, 11, true, '2019-09-16 19:50:56');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (5, 10, true, '2019-08-11 02:15:29');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (3, 8, false, '2019-08-07 07:53:51');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (2, 8, false, '2019-09-07 15:28:11');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (7, 8, false, '2019-08-22 16:35:58');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (5, 12, true, '2019-08-18 22:53:24');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (5, 11, false, '2019-09-11 09:16:24');

insert into participants
  (user_id, event_id, admin, joined_time)
values
  (3, 14, false, '2019-09-12 22:41:23');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (6, 14, true, '2019-09-22 20:30:45');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (8, 14, true, '2019-08-06 09:59:34');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (7, 14, true, '2019-08-09 22:08:17');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (2, 14, false, '2019-08-07 00:13:31');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (5, 14, true, '2019-09-18 22:58:58');

insert into participants
  (user_id, event_id, admin, joined_time)
values
  (1, 14, false, '2019-09-12 22:41:23');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (4, 14, true, '2019-08-06 09:59:34');
insert into participants
  (user_id, event_id, admin, joined_time)
values
  (9, 14, true, '2019-09-18 22:58:58');
