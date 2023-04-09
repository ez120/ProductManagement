// get total
let Name=document.getElementById("Name");
let Price=document.getElementById("Price");
let Taxes=document.getElementById("Taxes");
let ADS=document.getElementById("ADS");
let Discount=document.getElementById("Discount");
let Create=document.getElementById("create");
let Count=document.getElementById("Count");
let Category=document.getElementById("Category");
let Total=document.getElementById("total");
let create=document.getElementById("create");
let Tbody=document.getElementById("Tbody");
let mood = "1";
let varGlo;
//Purchase value calculation
function onKey(name){
  name.onkeyup = ()=>{
    if(Price.value !=""){
  let Totals= +Price.value + +Taxes.value + +ADS.value - +Discount.value;
  Total.innerHTML= `TOTAL:${Totals}`;
  Total.style.color = "#ffc107"}else{
  Total.innerHTML= `TOTAL:0`;
  Total.style.color = "#607d8b"
}
}
}
onKey(Price);
onKey(Taxes);
onKey(ADS);
onKey(Discount);
//Take the data and put it into a table
let serArray;
if(localStorage.prodact != null){
serArray=JSON.parse(localStorage.prodact)
}else{
serArray=[];
}
i=0;
Create.onclick = ()=>{
let newOb={
  Name:Name.value.toLowerCase(),
  Price:Price.value,
  Taxes:Taxes.value,
  ADS:ADS.value,
  Discount:Discount.value,
  Total:Total.innerHTML,
  Count:Count.value,
  Category:Category.value.toLowerCase(),
}
if(Name.value !="" && Price.value !="" && Category.value !=""){
  if(mood === "1"){
  console.log("hello")
  if(newOb.Count != 0){
  for(i=0;i<newOb.Count;i++){
  serArray.push(newOb)}}
    clearData()
}else{
  serArray[varGlo]=newOb;
  mood ="1";
  Count.style.transform="scale(1)";
  Create.innerHTML="Create";
  clearData()
}
}
localStorage.setItem("prodact",JSON.stringify(serArray));
readData()
console.log(serArray)
};
//clear data
function clearData(){
Name.value="";
Price.value="";
Taxes.value="";
ADS.value="";
Discount.value="";
Count.value="";
Category.value="";
Total.innerHTML='TOTAL:0';
Total.style.color="#607d8b";
}
//read data
function readData(){
  let Table ="";

  for(i=0;i<serArray.length ; i++){
    Table +=`      <tr>
        <td>${i+1}</td>
        <td>${serArray[i].Name}</td>
        <td>${serArray[i].Price}</td>
        <td>${serArray[i].Taxes}</td>
        <td>${serArray[i].ADS}</td>
        <td>${serArray[i].Discount}</td>
        <td>${serArray[i].Total}</td>
        <td>${serArray[i].Category}</td>
        <td><button onclick ="upData(${i})"  class="up">UpData</button></td>
        <td><button onclick ="dele(${i})" class="del">Delete</button></td>
      </tr>`
  }
  Tbody.innerHTML=Table;
    if(serArray.length != 0){
  document.getElementById('delAll').style.display="block"
}else{
  document.getElementById('delAll').style.display="none"
}
}
readData()
// delete prod
function dele(i){
  serArray.splice(i,1);
  localStorage.prodact=JSON.stringify(serArray)
  readData()
}
// delete All prod
function allDele(){
  serArray.splice(0,serArray.length);
  localStorage.prodact=JSON.stringify(serArray)
  readData()
  clearData()
}
//upData a Value
function upData(i){
Name.value=serArray[i].Name;
Price.value=serArray[i].Price;
Taxes.value=serArray[i].Taxes;
ADS.value=serArray[i].ADS;
Discount.value=serArray[i].Discount;
Count.style.transform="scale(0)";
Category.value=serArray[i].Category;
Create.innerHTML="UpData";
mood ="0";
varGlo=i;
scroll({
  top:0,
  behavior:"smooth"
})
}
//search
let moodSearch="0";
function getSearchMood(id){
  let search=document.getElementById("Search");
if(id ==="searchName"){
  moodSearch="0";
  search.placeholder="SearchName"
}else{
  moodSearch="1"
  search.placeholder="SearchCategory"
}
search.focus()
search.value="";
readData()
}
function searchData(value){
  let Table="";
  for(i=0;i<serArray.length;i++){
  if(moodSearch === "0"){
      if(serArray[i].Name.includes(value.toLowerCase())){
    Table +=`      <tr>
        <td>${i+1}</td>
        <td>${serArray[i].Name}</td>
        <td>${serArray[i].Price}</td>
        <td>${serArray[i].Taxes}</td>
        <td>${serArray[i].ADS}</td>
        <td>${serArray[i].Discount}</td>
        <td>${serArray[i].Total}</td>
        <td>${serArray[i].Category}</td>
        <td><button onclick ="upData(${i})"  class="up">UpData</button></td>
        <td><button onclick ="dele(${i})" class="del">Delete</button></td>
      </tr>`
      }
      Tbody.innerHTML=Table;
    
  }else{
    
      if(serArray[i].Category.includes(value.toLowerCase())){
    Table +=`      <tr>
        <td>${i+1}</td>
        <td>${serArray[i].Name}</td>
        <td>${serArray[i].Price}</td>
        <td>${serArray[i].Taxes}</td>
        <td>${serArray[i].ADS}</td>
        <td>${serArray[i].Discount}</td>
        <td>${serArray[i].Total}</td>
        <td>${serArray[i].Category}</td>
        <td><button onclick ="upData(${i})"  class="up">UpData</button></td>
        <td><button onclick ="dele(${i})" class="del">Delete</button></td>
      </tr>`
      }
      Tbody.innerHTML=Table;
    }
  }
}