$(function(){

  function buildHTML(message){

    if (message.image){
      var html = `<div class="chat-main__message-list__commenter">
                    <div class="chat-main__message-list__commenter__name">
                      ${message.name}
                    </div>
                    <div class="chat-main__message-list__commenter__time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="chat-main__message-list__content">
                    ${message.content}
                  </div>
                  <img src=${message.image}>`
      return html;
    } else {
      var html = `<div class="chat-main__message-list__commenter">
                    <div class="chat-main__message-list__commenter__name">
                      ${message.name}
                    </div>
                    <div class="chat-main__message-list__commenter__time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="chat-main__message-list__content">
                    ${message.content}
                  </div>`
      return html;
    }

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
      console.log(message)
      var html = buildHTML(message);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.chat-main__message-form__new_message__sendbtn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});