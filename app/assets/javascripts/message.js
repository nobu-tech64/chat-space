$(function(){

  var buildHTML = function(message) {

    if (message.content && message.image) {
      var html = `<div class="chat-main__message-list__commenter" data-message-id=${message.id}>
                    <div class="chat-main__message-list__commenter__name">${message.user_name}</div>
                    <div class="chat-main__message-list__commenter__time">${message.created_at}</div>
                  </div>
                  <div class="chat-main__message-list__content">${message.content}</div>
                  <img src="${message.image}" class="chat-main__message-list__image">`
    } else if (message.content) {
      var html = `<div class="chat-main__message-list__commenter" data-message-id=${message.id}>
                    <div class="chat-main__message-list__commenter__name">${message.user_name}</div>
                    <div class="chat-main__message-list__commenter__time">${message.created_at}</div>
                  </div>
                  <div class="chat-main__message-list__content">${message.content}</div>`
    } else if (message.image) {
      var html = `<div class="chat-main__message-list__commenter" data-message-id=${message.id}>
                    <div class="chat-main__message-list__commenter__name">${message.user_name}</div>
                    <div class="chat-main__message-list__commenter__time">${message.created_at}</div>
                  </div>
                  <img src="${message.image}" class="chat-main__message-list__image">`
    };
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.chat-main__message-form__new_message__sendbtn').prop('disabled', false);
    });
  });

  var reloadMessages = function() {
    last_message_id = $('.chat-main__message-list__commenter:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $(".chat-main__message-list").append(insertHTML);
        $(".chat-main__message-list").animate({scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
  
});