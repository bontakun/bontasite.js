Bontasite blog, contact, about, etc.

Production deployment info
--------------------------

Startup script
/etc/init.d/bontasite start

Monitoring scripts
/etc/init/monit.conf
/etc/monit/conf.d/bontasite

Restart monitoring service
service monit restart

### BEGIN INIT INFO
# Provides:          bontasite
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Runs the bontasite application.
# Description:       Starts and stops the bontasite application
### END INIT INFO