Bontasite blog, contact, about, etc.

Production deployment info
--------------------------

Startup script
/etc/init.d/bontasite start

Monitoring script
/etc/monit/conf.d/bontasite

Restart monitoring service
service monit restart

### BEGIN INIT INFO
# Provides:          iptables
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Runs iptables.
# Description:       Starts and stops the iptables application
### END INIT INFO