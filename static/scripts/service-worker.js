self.addEventListener('push', function(event) {
  // if (event.data) {
  //   console.log('This push event has data: ', event.data.text());
  // } else {
  //   console.log('This push event has no data.');
  // }
  // console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * * * *')
  // console.log('event.data.text()', event.data.text())
  // console.log('event.data.json()', event.data.json())
  // var json = event.data.json()
  return self.registration.showNotification(event.data.text());
});
