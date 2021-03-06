'use strict';
const   mongoose = require('mongoose'),
        seeder = require('./dataSeeder');
//const { seedistrue } = require('./dataSeeder');
mongoose.Promise = global.Promise;

const database = function () {
    var conn = null,
        connectionTries = 0,
        //seeded = false,
        
        init = (config) => {
            console.log('Trying to connect to ' + config.host + '/' + config.database + ' MongoDB database');
            var options = {
                promiseLibrary: global.Promise
            };

            // #######
            //  I using Kubernetes we could pull the password from an env variable set via a Secret
            //  That's actually done in the .k8s/mongo.deployment.yml file if you're interested in seeing it in action
            //  Keeping it simple here on purpose
            // #######
            var connString = `mongodb://${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@${config.host}:27017/${config.database}`;
            const conn = mongoose.connection;
            conn.on('error', function(err) {
                console.error('Connection error: ', err);
            });
            conn.once('open', function() {
                console.log('DB CONNECTION OPEN SUCCESFULY');
                mongoose.connection.db.listCollections({name: 'productTypes'})
                .next((err, collinfo) => {
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        seeder.seed();
                    }
                    
                });
                
              
            });

            connect(connString, options);
            return conn;
        },

        connect = (connStr, options) => {
            mongoose.connect(connStr, options, function(err) {
                if (err) {
                    if (connectionTries < 10) {
                        setTimeout(() => {
                            console.log('****** Trying connect again. Tried ' + connectionTries + ' times ******');
                            connectionTries++;
                            connect(connStr, options);
                        }, 5000);
                    }
                }
            });
        },

        close = () => {
            if (conn) {
                conn.close(function () {
                    console.log('Mongoose default connection disconnected through app termination');
                    process.exit(0);
                });
            }
        }

    return {
        init:  init,
        close: close
    };

}();

module.exports = database;
