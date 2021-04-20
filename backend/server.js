let express = require("express"); 
const cors = require("cors"); 
const store = require("store");

let app = express();

app.use(cors());
app.use(express.json()); 

let members = [];
let allMembersExpenses= {};

store.set("members", members);

let server = app.listen(8081, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});

app.get("/getAllMembers", function (req, res) {
  res.json(store.get("members"));
});

app.post("/addMember", function (req, res) {
  let newMember = req.body;
  members.push(newMember);
  store.set("members", members);
  res.json(store.get("members"));
});

app.put("/updateMember", function (req, res) {
  let member = req.body;
  members = store.get("members");

  members = members.map((value, key) => {
    if (value.memberId == member.memberId) {
      value.name = member.name;
    }
    return value;
  });

  store.set("members", members);
  members = store.get("members");
  res.json(store.get("members"));
});

app.delete("/deleteMember", function (req, res) {
  let memberId = req.query.memberId; 
  members = store.get("members");

  members = members.filter((value, key) => {
   if (value.memberId != memberId) {
    return value;
   }
  });

  store.set("members", members);
  res.json(members);
});

//expenses
app.get("/allExpensesByMemberId", function (req, res) {
   let memberId = req.query.memberId;
   if(store.get("allMembersExpenses")){
      res.json(store.get("allMembersExpenses")[memberId]);
   }
 });
 
app.post("/addExpense", function (req, res) { 
   let memberId = req.body.memberId;

   if(allMembersExpenses[memberId]){
      allMembersExpenses[memberId].push(req.body);
   }else{
      allMembersExpenses[memberId] =[req.body]
   } 
    let totalAmount= allMembersExpenses[memberId].reduce(
        (acc, exp) => (parseFloat(exp.amount) + acc),0
      ).toFixed(2);  
   members.forEach(member=>{
      if(member.memberId == memberId){
         member.totalAmount = totalAmount;
      }
   })

   store.set("members", members);
   store.set("allMembersExpenses", allMembersExpenses);
   res.json(store.get("allMembersExpenses")[memberId]);
 });
 
 app.put("/updateExpense", function (req, res) { 
   let memberId = req.body.memberId;
   let expenseId = req.body.expenseId;
 

      allMembersExpenses[memberId]= allMembersExpenses[memberId].map(exp=>{
         if(exp.expenseId == expenseId){ 
            exp.expense = req.body.expense,
            exp.amount = req.body.amount
         }
         return exp;
      }) 
   
    
    let totalAmount= allMembersExpenses[memberId].reduce(
        (acc, exp) => (parseFloat(exp.amount) + acc),0
      ).toFixed(2);  

   members.forEach(member=>{
      if(member.memberId == memberId){
         member.totalAmount = totalAmount;
      }
   })

   store.set("members", members);
   store.set("allMembersExpenses", allMembersExpenses);
   res.json(store.get("allMembersExpenses")[memberId]);
  
 });
 
 app.delete("/deleteExpense", function (req, res) {
   let expenseId = req.query.expenseId; 
   let memberId = req.query.memberId;   
      allMembersExpenses[memberId]= allMembersExpenses[memberId].filter(exp=>{
         if(exp.expenseId != expenseId){ 
            return exp;
         }
      }) 
      
    let totalAmount= allMembersExpenses[memberId].reduce(
        (acc, exp) => (parseFloat(exp.amount) + acc),0
      ).toFixed(2);  

   members.forEach(member=>{
      if(member.memberId == memberId){
         member.totalAmount = totalAmount;
      }
   })

   store.set("members", members);
   store.set("allMembersExpenses", allMembersExpenses);
   res.json(store.get("allMembersExpenses")[memberId]);
 });

 app.get("/calculateExpenses", function (req, res) { 
    members = store.get("members");
    expensesResult=[];

    //all members:totalAmount obj
    let memberAndExpenseObj ={};

   members.forEach(m=>{
      memberAndExpenseObj[m.name] = parseInt(m.totalAmount);
   })
      
      let listOfMembers = Object.keys(memberAndExpenseObj);
      let listOfExpPerMember = Object.values(memberAndExpenseObj);
  
      const groupExpense  = listOfExpPerMember.reduce(
        (acc , curr ) => curr + acc
      );  
      const meanExpense = (groupExpense / listOfMembers.length).toFixed(2); 

      const sortedMembersByExpense = listOfMembers.sort(
        (member1, member2) => memberAndExpenseObj[member1] - memberAndExpenseObj[member2]
      ); 

      const sortedAmountTobePaidPerMember = sortedMembersByExpense.map(
        (member) => memberAndExpenseObj[member] - meanExpense
      );
 
      if(sortedAmountTobePaidPerMember.every(val=>val ==0)){
          res.json(["All Expenses Settled!"]);
      }
  else{ 
      let i = 0;
      let j = sortedMembersByExpense.length - 1;
      let debt ;
  
      while (i < j) {
        debt = Math.min(-sortedAmountTobePaidPerMember[i], sortedAmountTobePaidPerMember[j]);
        sortedAmountTobePaidPerMember[i] += debt;
        sortedAmountTobePaidPerMember[j] -= debt;
   
        expensesResult.push(
          `${sortedMembersByExpense[i]} owes ${sortedMembersByExpense[j]} $${debt.toFixed(2)}`
        );
  
        if (sortedAmountTobePaidPerMember[i] === 0) {
          i++;
        }
  
        if (sortedAmountTobePaidPerMember[j] === 0) {
          j--;
        }
      } 
      res.json(expensesResult);
   }
 });
