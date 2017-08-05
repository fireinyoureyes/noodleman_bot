const TelegramBot = require('node-telegram-bot-api');

const  token = '363674681:AAE7f2DnppdFL9QZo5lzGmbFykWNs5-ygy4';
let botOptions = {
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

let foodItems = {
  duckRamen: new Food("Duck Ramen", 0),
  tomYoung: new Food("Tom Young", 0),
  porkNoodles: new Food("Pork Noodles", 0),
  chickenNoodles: new Food("Chicken Noodles", 0),
  lichee: new Food("Lichee", 0),
  mango: new Food("Mango", 0),
  bud: new Food("Budweiser", 0),
  proseco: new Food("Proseco", 0)
};

let order = [];

const menu = [
  {
  title: "Start",
  buttons:[
    [{text:"Menu", callback_data:"START_MENU"}],
    [{text:"My Order", callback_data:"START_ORDER"}],
    [{text:"Send", callback_data:"START_CONFIRM"}],
    [{text:"Reset", callback_data:"START_RESET"}]
  ]},
  {
    title: "Menu",
    buttons:[
      [{text:"Ramen", callback_data:"MENU_RAMEN"}],
      [{text:"Nodoles", callback_data:"MENU_NOODLES"}],
      [{text:"Drinks", callback_data:"MENU_DRINKS"}],
      [{text:"Alcohol", callback_data:"MENU_ALCO"}],
      [{text:"Back", callback_data:"MENU_BACK"}]
    ]},
  {
    title: "Ramen",
    buttons:[
      [{text:"Duck Ramen", callback_data:"RAMEN_DUCK"}],
      [{text:"Tom Young", callback_data:"RAMEN_TOM"}],
      [{text:"Back", callback_data:"RAMEN_BACK"}]
  ]},
  {
    title: "Noodles",
    buttons:[
      [{text:"Pork Noodles", callback_data:"NOODLES_PORK"}],
      [{text:"Chicken Noodles", callback_data:"NOODLES_CHICKEN"}],
      [{text:"Back", callback_data:"NOODLES_BACK"}]
  ]},
  {
    title: "Drinks",
    buttons:[
      [{text:"Lichee", callback_data:"DRINKS_LICHEE"}],
      [{text:"Mango", callback_data:"DRINKS_MANGO"}],
      [{text:"Back", callback_data:"DRINKS_BACK"}]
  ]},
  {
    title: "Alcohol",
    buttons:[
      [{text:"Budweiser", callback_data:"ALCO_BUD"}],
      [{text:"Proseco", callback_data:"ALCO_PROSECO"}],
      [{text:"Back", callback_data:"ALCO_BACK"}]
  ]},
]

bot.on('text', function(msg) {
    let messageChatId = msg.chat.id;
    let messageText = msg.text;
    let messageDate = msg.date;
    let messageUsr = msg.from.username;
    console.log(msg);

    if (messageText === '/menu') {
      let page = menu[2];
      let text = page.title;
      let options = {
        reply_markup: JSON.stringify({
          inline_keyboard: page.buttons,
          parse_mode: 'Markdown'
        })
      }

      let chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
      bot.sendMessage(chat, text, options);
    }

    if (messageText === '/start') {
      let page = menu[0];
      let text = page.title;
      let options = {
        reply_markup: JSON.stringify({
          inline_keyboard: page.buttons,
          parse_mode: 'Markdown'
        })
      }
      let chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
      bot.sendMessage(chat, text, options);
    }

    if (messageText === 'hi') {
        bot.sendMessage(messageChatId, 'Hello Master');
    }
})

bot.on('callback_query', function (msg) {
        console.log("This is msg data you get:",msg);
        let pick = msg.data.split('_');
        console.log("This is PICK data you get:",pick);
        let source_page = pick[0];
        let next_page = pick[1];

        switch (source_page) {
          case 'START':
            switch (next_page) {
              case 'MENU':
                var page = menu[1];
                var text = page.title;
                var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
                })
              }
              sendMsgBack(bot,msg,text,options);
                break;

              case 'ORDER':
              var text = "Here you can see you order: \n";
              var check = checkPls(foodItems);
              text += check;
              sendMsgBack(bot,msg,text,options);
                break;

              case 'CONFIRM':
              var text = 'Order sent. We will contact you in 5 seconds!';
              var sentOrder = checkPls(foodItems);
              var adminId = 31893285;
              sendMsgBack(bot,msg,text,options);
              bot.sendMessage(adminId,sentOrder);
                break;

              case 'RESET':
              var text = 'Your order was cleared.';
              sendMsgBack(bot,msg,text);
                break;

              default:
              var text = 'The default property worked!';
              sendMsgBack(bot,msg,text,options);
                break;
            }
            break;
          case 'MENU':
            switch (next_page) {
              case'RAMEN':
              var page = menu[2];
              var text = page.title;
              var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
                })
              }
              sendMsgBack(bot,msg,text,options);
            break;

            case'NOODLES':
              var page = menu[3];
              var text = page.title;
              var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
          })
        }
              sendMsgBack(bot,msg,text,options);
            break;

            case 'DRINKS':
              var page = menu[4];
              var text = page.title;
              var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
          })
        }
            sendMsgBack(bot,msg,text,options);
            break;

            case 'ALCO':
              var page = menu[5];
              var text = page.title;
              var options = {
                reply_markup: JSON.stringify({
                  inline_keyboard: page.buttons,
                  parse_mode: 'Markdown'
          })
        }
            sendMsgBack(bot,msg,text,options);
            break;

            case 'BACK':
            var page = menu[0];
            var text = page.title;
            var options = {
              reply_markup: JSON.stringify({
                inline_keyboard: page.buttons,
                parse_mode: 'Markdown'
          })
        }
            sendMsgBack(bot,msg,text,options);
            break;

            default:
            var text = "The default property worked!"
            sendMsgBack(bot,msg,text,options);
            break;
        }
        break;
        case 'RAMEN':
        switch (next_page) {
          case 'DUCK':
          //duck ramen added
          foodItems.duckRamen.addItem();
          orderItem('duckRamen',con);
          var text = "You ordered Duck Ramen!"
          sendMsgBack(bot,msg,text,options);
            break;

          case 'TOM':
          //tom young added
          foodItems.tomYoung.addItem();
          orderItem('tomYoung',con);
          var text = "You ordered Tom Young!"
          sendMsgBack(bot,msg,text,options);
          break;

          case 'BACK':
          var page = menu[1];
          var text = page.title;
          var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: page.buttons,
            parse_mode: 'Markdown'
          })
        }
        sendMsgBack(bot,msg,text,options);
          break;

          default:
          break;
        }
        break;
        case 'NOODLES':
        switch (next_page) {
          case 'PORK':
          //pork noodles added
          foodItems.porkNoodles.addItem();
          orderItem('porkNoodles',con);
          var text = "You ordered Pork Noodles!"
          sendMsgBack(bot,msg,text,options);
            break;

          case 'CHICKEN':
          //chicken noodles added
          foodItems.chickenNoodles.addItem();
          orderItem('chickenNoodles',con);
          var text = "You ordered Chicken Noodles!"
          sendMsgBack(bot,msg,text,options);
          break;

          case 'BACK':
          var page = menu[1];
          var text = page.title;
          var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: page.buttons,
            parse_mode: 'Markdown'
          })
        }
        sendMsgBack(bot,msg,text,options);
          break;

          default:
          break;
        }
        break;

        case 'DRINKS':
        switch (next_page) {
          case 'LICHEE':
          //lichee drink added
          foodItems.lichee.addItem();
          orderItem('lichee',con);
          var text = "You ordered Lichee Drink!"
          sendMsgBack(bot,msg,text,options);
            break;

          case 'MANGO':
          //mango drink added
          foodItems.mango.addItem();
          orderItem('mango',con);
          var text = "You ordered Mango Drink!"
          sendMsgBack(bot,msg,text,options);
          break;

          case 'BACK':
          var page = menu[1];
          var text = page.title;
          var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: page.buttons,
            parse_mode: 'Markdown'
          })
        }
        sendMsgBack(bot,msg,text,options);
          break;

          default:
          break;
        }
        break;
        case 'ALCO':
        switch (next_page) {
          case 'BUD':
          //budweiser added
          foodItems.bud.addItem();
          orderItem('bud',con);
          var text = "You ordered Budweiser!"
          sendMsgBack(bot,msg,text,options);
            break;

          case 'PROSECO':
          //proseco added
          foodItems.proseco.addItem();
          orderItem('proseco',con);
          var text = "You ordered Proseco!"
          sendMsgBack(bot,msg,text,options);
          break;

          case 'BACK':
          var page = menu[1];
          var text = page.title;
          var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: page.buttons,
            parse_mode: 'Markdown'
          })
        }
        sendMsgBack(bot,msg,text,options);
          break;

          default:
          break;
        }
        break;
      }
});

const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: "telegrambot"
});

/*function orderItem(id, connection) {
  connection.connect(function (err) {
    let foodItem = connection.query("SELECT * FROM customers WHERE foodId = " + id, function (err, result) {
      if(err) console.log(err);
      console.log(result);
    });
      console.log(foodItem);
    if(foodItem[0].foodAmount > 0) {
      let newAmount = foodItem[0].foodAmount--;
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
  let check = [];
  let checkMsg = "";
  for(let key in foodItems) {
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
  let itemData;
  connection.connect(function (err) {
  connection.query("SELECT * FROM customers WHERE foodId = ?",[id], function (err, result) {
      if(err) console.log(err);
      itemData = result[0];
      console.log(itemData);
      let newAmount = itemData.foodAmount;
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


function sendMsgBack(bot,msg,text, options) {
  let chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
  bot.sendMessage(chat, text, options);
  bot.answerCallbackQuery(msg.id);
}
