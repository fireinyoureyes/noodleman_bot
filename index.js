const TelegramBot = require('node-telegram-bot-api');

const  token = '363674681:AAE7f2DnppdFL9QZo5lzGmbFykWNs5-ygy4';
var botOptions = {
    polling: true
};
const bot = new TelegramBot(token, botOptions);

function onCallbackQuery(callbackQuery) {
    console.log('callbackQuery:', callbackQuery);
  }

bot.getMe().then(function(me)
{
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
})

/*var order = {
  duckRamen:0,
  tomYoung:0,
  porkNoodles:0,
  chickenNoodles:0,
  lichee:0,
  mango:0,
  bud:0,
  proseco:0
};*/
class Food {

  constructor(name, amount) {
    this.name = name;
    this.amount = amount;
    this.addItem = function () {
      this.amount++;
    };
  }
  get getName() {
    return this.name;
  };
  get getAmount() {
    return this.amount;
  };
  set setAmount(newAmount) {
    this.amount = newAmount;
  };

};

var foodItems = {
  duckRamen: new Food("Duck Ramen", 0),
  tomYoung: new Food("Tom Young", 0),
  porkNoodles: new Food("Pork Noodles", 0),
  chickenNoodles: new Food("Chicken Noodles", 0),
  lichee: new Food("Lichee", 0),
  mango: new Food("Mango", 0),
  bud: new Food("Budweiser", 0),
  proseco: new Food("Proseco", 0)
};

var order = [];

var menu = [
  {
  title: "Start",
  buttons:[
    [{text:"Menu", callback_data:"0_1"}],
    [{text:"My Order", callback_data:"0_2"}],
    [{text:"Send", callback_data:"0_3"}],
    [{text:"Reset", callback_data:"0_4"}]
  ]},
  {
    title: "Menu",
    buttons:[
      [{text:"Ramen", callback_data:"1_1"}],
      [{text:"Nodoles", callback_data:"1_2"}],
      [{text:"Drinks", callback_data:"1_3"}],
      [{text:"Alcohol", callback_data:"1_4"}],
      [{text:"Back", callback_data:"1_5"}]
    ]},
  {
    title: "Ramen",
    buttons:[
      [{text:"Duck Ramen", callback_data:"2_1"}],
      [{text:"Tom Young", callback_data:"2_2"}],
      [{text:"Back", callback_data:"2_3"}]
  ]},
  {
    title: "Noodles",
    buttons:[
      [{text:"Pork Noodles", callback_data:"3_1"}],
      [{text:"Chicken Noodles", callback_data:"3_2"}],
      [{text:"Back", callback_data:"3_3"}]
  ]},
  {
    title: "Drinks",
    buttons:[
      [{text:"Lichee", callback_data:"4_1"}],
      [{text:"Mango", callback_data:"4_2"}],
      [{text:"Back", callback_data:"4_3"}]
  ]},
  {
    title: "Alcohol",
    buttons:[
      [{text:"Budweiser", callback_data:"5_1"}],
      [{text:"Proseco", callback_data:"5_2"}],
      [{text:"Back", callback_data:"5_3"}]
  ]},
]

bot.on('text', function(msg) {
    var messageChatId = msg.chat.id;
    var messageText = msg.text;
    var messageDate = msg.date;
    var messageUsr = msg.from.username;
    console.log(msg);

    if (messageText === '/menu') {
      var page = menu[2];
      var text = page.title;
      var options = {
        reply_markup: JSON.stringify({
          inline_keyboard: page.buttons,
          parse_mode: 'Markdown'
        })
      }

      chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
      bot.sendMessage(chat, text, options);
    }

    if (messageText === '/start') {
      var page = menu[0];
      var text = page.title;
      var options = {
        reply_markup: JSON.stringify({
          inline_keyboard: page.buttons,
          parse_mode: 'Markdown'
        })
      }
      chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
      bot.sendMessage(chat, text, options);
    }

    if (messageText === 'hi') {
        bot.sendMessage(messageChatId, 'Hello Master');
    }
})

bot.on('callback_query', function (msg) {
        console.log("This is msg data you get:",msg);
        var pick = msg.data.split('_');
        var menu_n = pick[0];
        var button = pick[1];

        switch (menu_n) {
          case '0':
            switch (button) {
              case '1':
                var page = menu[1];
                var text = page.title;
                var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
                })
              }
              chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
              bot.sendMessage(chat, text, options);
              bot.answerCallbackQuery(msg.id);
                break;
              case '2':
              var text = "Here you can see you order: \n"
              var check = checkPls(foodItems);
              chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
              bot.sendMessage(chat, text + check );
              bot.answerCallbackQuery(msg.id);
                break;
              case '3':
              var text = 'Order sent. We will contact you in 5 seconds!';
              var sentOrder = checkPls(foodItems);
              var adminId = 31893285;
              chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
              bot.sendMessage(adminId,sentOrder);
              bot.sendMessage(chat, sentOrder);
              bot.answerCallbackQuery(msg.id);
                break;
              case '4':
              var text = 'Your order was cleared.';
              chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
              bot.sendMessage(chat, text);
              bot.answerCallbackQuery(msg.id);
                break;
              default:
              var text = 'The default property worked!';
              chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
              bot.sendMessage(chat, text);
              bot.answerCallbackQuery(msg.id);
                break;
            }
            break;
          case '1':
            switch (button) {
              case'1':
              var page = menu[2];
              var text = page.title;
              var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
                })
              }
              chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
              bot.sendMessage(chat, text, options);
              bot.answerCallbackQuery(msg.id);

            break;
            case'2':
              var page = menu[3];
              var text = page.title;
              var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
          })
        }
              chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
              bot.sendMessage(chat, text, options);
              bot.answerCallbackQuery(msg.id);
            break;
            case '3':
              var page = menu[4];
              var text = page.title;
              var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
          })
        }
            chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
            bot.sendMessage(chat, text, options);
            bot.answerCallbackQuery(msg.id);
            break;
            case '4':
              var page = menu[5];
              var text = page.title;
              var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
          })
        }
            chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
            bot.sendMessage(chat, text, options);
            bot.answerCallbackQuery(msg.id);
            break;
            case '5':
            var page = menu[0];
            var text = page.title;
            var options = {
              reply_markup: JSON.stringify({
                inline_keyboard: page.buttons,
                parse_mode: 'Markdown'
          })
        }
            chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
            bot.sendMessage(chat, text, options)
            break;
            default:
            var text = "The default property worked!"
            chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
            bot.sendMessage(chat, text, options);
            bot.answerCallbackQuery(msg.id);
            break;
        }
        break;
        case '2':
        switch (button) {
          case '1':
          //duck ramen added
          foodItems.duckRamen.addItem();
          console.log(foodItems.duckRamen);
          orderItem('duckRamen',con);

          var text = "You ordered Duck Ramen!"
          chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
          bot.sendMessage(chat, text);
          bot.answerCallbackQuery(msg.id);
            break;
          case '2':
          //tom young added
          foodItems.tomYoung.addItem();
          console.log(foodItems.tomYoung);
          orderItem('tomYoung',con);
          var text = "You ordered Tom Young!"
          chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
          bot.sendMessage(chat, text);
          bot.answerCallbackQuery(msg.id);
          break;
          case '3':
          var page = menu[1];
          var text = page.title;
          var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: page.buttons,
            parse_mode: 'Markdown'
          })
        }
        chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
        bot.sendMessage(chat, text, options);
        bot.answerCallbackQuery(msg.id);
          break;
          default:
          break;
        }
        break;
        case '3':
        switch (button) {
          case '1':
          //pork noodles added
          foodItems.porkNoodles.addItem();
          console.log(foodItems.porkNoodles);
          orderItem('porkNoodles',con);

          var text = "You ordered Pork Noodles!"
          chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
          bot.sendMessage(chat, text);
          bot.answerCallbackQuery(msg.id);
            break;
          case '2':
          //chicken noodles added
          foodItems.chickenNoodles.addItem();
          console.log(foodItems.chickenNoodles);
          orderItem('chickenNoodles',con);
          var text = "You ordered Chicken Noodles!"
          chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
          bot.sendMessage(chat, text);
          bot.answerCallbackQuery(msg.id);
          break;
          case '3':
          var page = menu[1];
          var text = page.title;
          var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: page.buttons,
            parse_mode: 'Markdown'
          })
        }
        chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
        bot.sendMessage(chat, text, options);
        bot.answerCallbackQuery(msg.id);
          break;
          default:
          break;
        }
        break;
        case '4':
        switch (button) {
          case '1':
          //lichee drink added
          foodItems.lichee.addItem();
          console.log(foodItems.lichee);
          orderItem('lichee',con);
          var text = "You ordered Lichee Drink!"
          chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
          bot.sendMessage(chat, text);
          bot.answerCallbackQuery(msg.id);
            break;
          case '2':
          //mango drink added
          foodItems.mango.addItem();
          console.log(foodItems.mango);
          orderItem('mango',con);
          var text = "You ordered Mango Drink!"

          chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
          bot.sendMessage(chat, text);
          bot.answerCallbackQuery(msg.id);
          break;
          case '3':
          var page = menu[1];
          var text = page.title;
          var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: page.buttons,
            parse_mode: 'Markdown'
          })
        }
        chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
        bot.sendMessage(chat, text, options);
        bot.answerCallbackQuery(msg.id);
          break;
          default:
          break;
        }
        break;
        case '5':
        switch (button) {
          case '1':
          //budweiser added
          foodItems.bud.addItem();
          console.log(foodItems.bud);
          orderItem('bud',con);

          var text = "You ordered Budweiser!"
          chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
          bot.sendMessage(chat, text);
          bot.answerCallbackQuery(msg.id);
            break;
          case '2':
          //proseco added
          foodItems.proseco.addItem();
          console.log(foodItems.proseco);
          orderItem('proseco',con);

          var text = "You ordered Proseco!"
          chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
          bot.sendMessage(chat, text);
          bot.answerCallbackQuery(msg.id);
          break;
          case '3':
          var page = menu[1];
          var text = page.title;
          var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: page.buttons,
            parse_mode: 'Markdown'
          })
        }
        chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
        bot.sendMessage(chat, text, options);
        bot.answerCallbackQuery(msg.id);
          break;
          default:
          break;
        }
        break;
      }
});

var mysql = require('mysql');
var con = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: "telegrambot"
});

/*function orderItem(id, connection) {
  connection.connect(function (err) {
    var foodItem = connection.query("SELECT * FROM customers WHERE foodId = " + id, function (err, result) {
      if(err) console.log(err);
      console.log(result);
    });
      console.log(foodItem);
    if(foodItem[0].foodAmount > 0) {
      var newAmount = foodItem[0].foodAmount--;
      connection.query("UPDATE customers SET foodAmount = " + newAmount + "WHERE foodN ="+ id, function(err,result) {
        if (err) console.log(err);
      });
      console.log(result[0].foodAmount);
      return true;
    }
    else {
      console.log("Fail!")
      return false;
    }
  })
}*/

//при выведении itemData в другой query() его нельзя считать и пишется undefined
//
function checkPls (foodItems) {
  console.log(foodItems);
  var check = [];
  var checkMsg = "";
  for(var key in foodItems) {
    console.log(foodItems[key]);
    if( foodItems[key].amount > 0) {
      check.push(foodItems[key]);
      checkMsg += foodItems[key].name + " -- " + foodItems[key].amount + "\n";
    }
  }
  console.log(check);
  console.log(checkMsg);
  return checkMsg;
  }

function orderItem(id,connection) {
  var itemData;
  connection.connect(function (err) {
  connection.query("SELECT * FROM customers WHERE foodId = ?",[id], function (err, result) {
      if(err) console.log(err);
      itemData = result[0];
      console.log(itemData);
      var newAmount = itemData.foodAmount;
      newAmount--;
      console.log(newAmount, itemData.foodAmount);
      connection.query("UPDATE customers SET foodAmount = ? WHERE foodId = ?",[newAmount, id],function (err, result) {
        if(err) console.log(err);
      });
      connection.query("SELECT * FROM customers WHERE foodId = ?",[id], function (err, result) {
          if(err) console.log(err);
          console.log(result);
        });
    });
  });
}
