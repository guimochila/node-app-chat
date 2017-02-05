var MyChatController = (function(io, $, moment, Mustache) {
  var socket = io();

  /*
    appController - Main chat control
  */
  var appCtrl = {
    init: function() {
      console.log('App started.');
      uiCtrl.setupEventListeners();
      networkCtrl.init();
    },

    dispatchMessage: function(text) {
      networkCtrl.sendMessage(text, uiCtrl.clearInput);
    },

    messageReceived: function(message) {
      var time = appCtrl.formatTime(message.createdAt);
      var formattedMessage = {
        text: message.text,
        from: message.from,
        createdAt: time,
      };
      uiCtrl.renderMessage(formattedMessage);
    },

    dispatchLocation: function() {
      if (!navigator.geolocation) {
        return alert('Geolocation not support by your browser!');
      }

      uiCtrl.renderLocationBtn('disable');
      navigator.geolocation.getCurrentPosition(function(position) {
        uiCtrl.renderLocationBtn('enable');
        var coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        networkCtrl.sendLocation(coords);
      }, function() {
        uiCtrl.renderLocationBtn('enable');
        alert('unable to fecth location');
      });
    },

    locationReceived: function(locationMsg) {
      var time = appCtrl.formatTime(locationMsg.createdAt);
      var formattedLocation = {
        from: locationMsg.from,
        url: locationMsg.url,
        createdAt: time,
      };
      uiCtrl.renderLocation(formattedLocation);
    },

    formatTime: function(time) {
      return moment(time).format('h:mm a');
    },

    updateUserList: function(users) {
      uiCtrl.renderUserList(users);
    },
  };

  /*
    networkController - network control
  */
  var networkCtrl = {
    sendMessage: function(message, clearInput) {
      socket.emit('createMessage', {
        text: message,
      }, clearInput);
    },

    sendLocation: function(coords) {
      socket.emit('createLocationMessage', coords);
    },

    connect: function() {
      socket.emit('join', function(err) {
        if (err) {
          alert(err);
          window.location.href = '/';
        } else {
          console.log('No error');
        }
      });
    },

    disconnect: function() {
      console.log('Disconnecting from chat');
    },

    init: function() {
      socket.on('connect', networkCtrl.connect);
      socket.on('disconnect', networkCtrl.disconnect);
      socket.on('newMessage', appCtrl.messageReceived);
      socket.on('updateUserList', appCtrl.updateUserList);
      socket.on('newLocationMessage', appCtrl.locationReceived);
    },
  };

  /*
    uiController - User Interface Controller
  */
  var uiCtrl = {
    DOM: {
      $messages: $('#messages'),
      $messageTemplate: $('#message-template'),
      $messageForm: $('#message-form'),
      $users: $('#users'),
      $messageInput: $('[name=message]'),
      $locationBtn: $('#send-location'),
      $locationMessage: $('#location-message-template'),
      $params: $.deparam(window.location.search),
    },

    renderMessage: function(message) {
      var html = Mustache.render(uiCtrl.DOM.$messageTemplate.html(), message);
      uiCtrl.DOM.$messages.append(html);
      uiCtrl.scrollToBottom();
    },

    renderUserList: function(users) {
      var ol = $('<ol></ol>');
      users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
      });
      $('#users').html(ol);
    },

    renderLocation: function(location) {
      var htmlLocation = Mustache.render(
        uiCtrl.DOM.$locationMessage.html(),
        location);
      uiCtrl.DOM.$messages.append(htmlLocation);
      uiCtrl.scrollToBottom();
    },

    clearInput: function() {
      uiCtrl.DOM.$messageInput.val('');
    },

    handleUserInput: function(e) {
      e.preventDefault();
      var messageText = uiCtrl.DOM.$messageInput.val();
      if (messageText.trim() === '') return;
      appCtrl.dispatchMessage(messageText);
    },

    renderLocationBtn: function(status) {
      if(status === 'disable') {
        uiCtrl.DOM.$locationBtn.attr('disabled', 'disabled')
          .text('Sending location...');
      } else if(status === 'enable') {
        uiCtrl.DOM.$locationBtn.removeAttr('disabled').text('Send location');
      }
    },
    scrollToBottom: function() {
      var messages = uiCtrl.DOM.$messages;
      var newMessage = messages.children('li:last-child');
      var clientHeight = messages.prop('clientHeight');
      var scrollTop = messages.prop('scrollTop');
      var scrollHeight = messages.prop('scrollHeight');
      var newMessageHeight = newMessage.innerHeight();
      var lastMessageHeight = newMessage.prev().innerHeight();

      if(clientHeight + scrollTop
        + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
      }
    },

    setupEventListeners: function() {
      uiCtrl.DOM.$messageForm.on('submit', uiCtrl.handleUserInput);
      uiCtrl.DOM.$locationBtn.on('click', appCtrl.dispatchLocation);
    },
  };

  return {
    init: appCtrl.init,
  };
})(io, jQuery, moment, Mustache);

MyChatController.init();
