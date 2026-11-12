'use strict';
const VERSION='1.0.0';
const $=id=>document.getElementById(id);
const temp=$('temp'),time=$('time'),unit=$('unit');
const defaultUnit=$('defaultUnit');
const storedUnit=localStorage.getItem('ovenAirFryer.unit');
if(storedUnit==='F'||storedUnit==='C'){unit.value=storedUnit;defaultUnit.value=storedUnit;temp.value=storedUnit==='C'?'200':'400';}
function displayNumber(value){return Number.isInteger(value)?String(value):value.toFixed(1);}
function calculate(){
  const t=Number(temp.value), m=Number(time.value);
  const valid=temp.value.trim()!==''&&time.value.trim()!==''&&Number.isFinite(t)&&Number.isFinite(m)&&t>0&&m>0&&t<=1000&&m<=1440;
  $('results').hidden=!valid;$('checkTip').hidden=!valid;$('error').hidden=valid;
  if(!valid)return;
  // Convert to Fahrenheit for the precise 25°F adjustment, then back to Celsius.
  const airTemp=unit.value==='F'?t-25:t-25*5/9;
  const roundedTemp=Math.round(airTemp/5)*5;
  const airTime=Math.round(m*.8*10)/10;
  $('outTemp').textContent=displayNumber(roundedTemp)+'°'+unit.value;
  $('outTime').textContent=displayNumber(airTime)+' min';
  const check=Math.max(.5,Math.round((airTime-Math.min(3,airTime*.2))*10)/10);
  $('checkTip').textContent='✓ Start checking for doneness around '+displayNumber(check)+' minutes.';
}
function setUnit(next){
  if(next!==unit.value){const current=Number(temp.value);if(temp.value.trim()!==''&&Number.isFinite(current))temp.value=String(Math.round((next==='C'?(current-32)*5/9:current*9/5+32)*10)/10);unit.value=next;}
  calculate();
}
temp.addEventListener('input',calculate);time.addEventListener('input',calculate);
unit.addEventListener('change',calculate);
defaultUnit.addEventListener('change',()=>{
  const next=defaultUnit.value;localStorage.setItem('ovenAirFryer.unit',next);setUnit(next);
});
$('reset').addEventListener('click',()=>{temp.value=unit.value==='F'?'400':'200';time.value='30';calculate();});
const dialog=$('settingsDialog');
$('settingsBtn').addEventListener('click',()=>dialog.showModal());
$('closeSettings').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
function networkStatus(){$('offline').hidden=navigator.onLine;}
window.addEventListener('online',networkStatus);window.addEventListener('offline',networkStatus);networkStatus();
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
  let refreshing=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!refreshing){refreshing=true;location.reload();}});
}
$('checkUpdates').addEventListener('click',async()=>{
  const status=$('updateStatus');status.textContent='Checking for updates…';
  if(!('serviceWorker' in navigator)){status.textContent='Updates are handled by your browser.';return;}
  try{
    const registration=await navigator.serviceWorker.getRegistration('./');
    if(!registration){status.textContent='App not yet cached. Reload while connected to the internet.';return;}
    await registration.update();
    if(registration.waiting){registration.waiting.postMessage({type:'SKIP_WAITING'});status.textContent='Installing update…';}
    else status.textContent='Update check complete. You have the latest available files.';
  }catch{status.textContent='Could not check. Try again when online.';}
});
calculate();