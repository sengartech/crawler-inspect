/**
 * importing modules.
 */
const dns = require('dns')
const exec = require('child_process').exec



// facebooks whitelist ip - whois -h whois.radb.net -- '-i origin AS32934' | grep ^route
// twitter whitelist ip - whois -h whois.radb.net -- '-i origin AS13414' | grep ^route

// const child;
// executes `pwd`
exec("whois -h whois.radb.net -- '-i origin AS13414' | grep ^route", (error, stdout, stderr) => {
  console.log('stdout: ' + stdout.split(' '))
  console.log('stderr: ' + stderr)
  if (error !== null) {
    console.log('exec error: ' + error)
  }
})
