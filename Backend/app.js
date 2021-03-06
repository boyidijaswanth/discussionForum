const app = require('./index.js');
const connectEnsureLogin = require('connect-ensure-login');
const Users = require('./entities/users.js');
const Topics = require('./entities/topics.js');
const Replies = require('./entities/replies.js');

app.post('/login', Users.login);
app.get('/login', Users.Unautherised);
app.get('/user', connectEnsureLogin.ensureLoggedIn(), Users.FetchUser);
app.post('/registerNewUser', Users.createNewUser);
app.post('/topic', connectEnsureLogin.ensureLoggedIn(), Topics.createTopic);
app.get('/topics', Topics.fetchTopics);
app.patch('/topics/:topicId', connectEnsureLogin.ensureLoggedIn(), Topics.updateTopic);
app.delete('/topics/:topicId', connectEnsureLogin.ensureLoggedIn(), Topics.deleteTopic);
app.post('/reply', connectEnsureLogin.ensureLoggedIn(), Replies.addReply)
app.get('/replies', Replies.fetchReplies);
app.patch('/replies/:replyID', connectEnsureLogin.ensureLoggedIn(), Replies.updateReply);
app.delete('/replies/:replyID', connectEnsureLogin.ensureLoggedIn(), Replies.deleteReply);
app.post('/logout', connectEnsureLogin.ensureLoggedIn(), Users.logout);