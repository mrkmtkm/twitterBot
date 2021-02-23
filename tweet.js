'use strict';

const twitter = require('twitter');
const client = new twitter({
    consumer_key: 'ここに入力', // consumer keyを記入
    consumer_secret     : 'ここに入力', // consumer secretを記入
    access_token_key    : 'ここに入力', // access tokenを記入
    access_token_secret : 'ここに入力' // access token secretを記入
});
const params = {
    q: 'ここに入力',count:'ここに入力'
}
//qに検索ワード、countにいくら検索するかを入力
// async/awaitで表現
const like = async () => {    
    client.get('search/tweets',  params, function(error, tweets, response) {
        if (!error) {
            Object.keys(tweets.statuses).forEach(function (key) {
                var val = this[key];
                var obj = (key, val);
                var Id = obj['id_str'];

            client.post('favorites/create', {id: Id}, function(error, response){
                if(error) console.log(error);
            });
                
            }, tweets.statuses);
        }
    });
    
    
};

const follow = async () => {

    client.get('search/tweets',  params, function(error, tweets, response) {
        if (!error) {
            Object.keys(tweets.statuses).forEach(function (key) {
                var val = this[key];
                var obj = (key, val);
                var Id = obj['id_str'];
                var userId = obj['user'].id_str;
                
                client.post('friendships/create', { user_id: userId }, function (error, response) {
                        if(error) console.log(error);
                });
            }, tweets.statuses);
        }
    });
};
like();
follow();
