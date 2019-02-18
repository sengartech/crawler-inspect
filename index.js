/**
 * importing modules.
 */
const dns = require('dns')
const exec = require('child_process').exec

dns.lookupService('66.249.66.1', 22, (err, hostname, service) => {
  console.log(hostname, service);
  // Prints: localhost ssh
  // for 127.0.0.1
})

dns.lookup('localhost', { family: 4 }, (err, address, family) => {
  console.log(address, family)
  // Prints: 127.0.0.1 4
  // for localhost
})

// facebooks whitelist ip - whois -h whois.radb.net -- '-i origin AS32934' | grep ^route
// twitter whitelist ip - whois -h whois.radb.net -- '-i origin AS13414' | grep ^route

// const child;
// executes `pwd`
child = exec("whois -h whois.radb.net -- '-i origin AS13414' | grep ^route", (error, stdout, stderr) => {
  console.log('stdout: ' + stdout)
  console.log('stderr: ' + stderr)
  if (error !== null) {
    console.log('exec error: ' + error)
  }
})
