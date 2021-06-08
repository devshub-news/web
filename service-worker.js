self.addEventListener('push', function(e) {
    var data;
  
    if (e.data) {
      data = JSON.parse(e.data.text());
    } else {
      data = {
        title: "New post",
        body: "",
        icon: 'assets/images/devshub.png'
      };
    }
  
    var options = {
      body: data.body,
      icon: data.icon || 'assets/images/devshub.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {action: 'explore', title: 'See post'}
      ]
    };
    e.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });