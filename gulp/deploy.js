var gulp = require('gulp');
var sftp = require('gulp-sftp');
var gulpSSH = require('gulp-ssh');
var uglify = require('gulp-uglify');
var pump = require('pump');
var joinPath = require('path').join;

var runSequence = require('run-sequence');

function ssh() {
    var config = require('../config');
    return new gulpSSH({
        ignoreErrors: false,
        sshConfig: config.deploy
    });
}

gulp.task('deploy', function(done) {
    runSequence('deploy:remote-clear', 'deploy:copy', 'deploy:npm-install', 'deploy:pm2-reload', done);
});



gulp.task('deploy:copy', function(cb) {
    var paths = ['build/**/*.js', 'eco.json', 'package.json'];

    var config = require('../config');
    var pkg = require('../package.json');

    pump([
            gulp.src(pkg.deployer.paths, {
                base: joinPath(__dirname, '..')
            }),
            sftp(config.deploy)
        ],
        cb
    );
});

gulp.task('deploy:npm-install', function() {
    var config = require('../config');

    return ssh()
        .shell(['cd ' + config.deploy.remotePath, 'npm install'], {
            filePath: 'npm-install.log'
        })
        .pipe(gulp.dest('logs'));
});

gulp.task('deploy:pm2-reload', function() {
    var config = require('../config');

    return ssh()
        .shell(['cd ' + config.deploy.remotePath, 'pm2 startOrRestart eco.json'], {
            filePath: 'pm2-reload.log'
        })
        .pipe(gulp.dest('logs'));
});

gulp.task('deploy:remote-clear', function() {
    var config = require('../config');
    var pkg = require('../package.json');
    var clearDirs = pkg.deployer.clearDirs;
    return ssh()
        .shell(['cd ' + config.deploy.remotePath]
            .concat(clearDirs.map(function(it) {
                return 'rm -rf ' + it;
            })), {
                filePath: 'remote-clear.log'
            })
        .pipe(gulp.dest('logs'));
});