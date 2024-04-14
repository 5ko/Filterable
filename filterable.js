/**
  Filterable lists and tables for PmWiki
  Written by (c) Petko Yotov 2023-2024   www.pmwiki.org/Petko
  License: MIT, see file LICENSE
  
  This module loads the Bootstrap Icons free font for Allegro.
  
  The files bootstrap-icons.* are those distributed at:
    https://github.com/twbs/icons/releases/

*/

(function(script){
  var conf = JSON.parse(script.dataset.conf);
  
  var minsize = parseInt(conf.minsize);
  
  var makeFilterableCnt = 0;
  function makeFilterable(){
    var lists = document.querySelectorAll(conf.selector);
    
    for(var i=0; i<lists.length; i++) {
      let list = lists[i];
      
      if(list.dataset.jets) continue;
      var items = (list.tagName == 'TABLE') 
        ? list.querySelectorAll('tr')
        : list.children;
        
      if(list.tagName == 'TABLE') {
        var thead = list.querySelector('thead');
        if(!thead) {
          thead = document.createElement('thead');
          list.insertBefore(thead, list.firstChild);
          thead.appendChild(items[0]);
          items = list.querySelectorAll('tbody > tr');
        }
      }
      
      // 1-4 rows/items : no filtering
      if(items.length<minsize) continue;
      
      if(list.tagName == 'OL') {
        for(var j=0; j<items.length; j++) {
          if(!items[j].getAttribute('value'))
            items[j].setAttribute('value', j+1);
        }
      }
      
      makeFilterableCnt++;
      
      var placeholder = (list.tagName == 'TABLE')? conf.ftable : conf.flist;
      if(list.dataset.inputfilter) {
        var searchqs = list.dataset.inputfilter;
      }
      else {
        var searchqs = '[data-jets="input'+makeFilterableCnt+'"]'
        var input = '<input type="search" class="inputbox noprint" placeholder="'+placeholder+'" size="30" data-jets="input'+makeFilterableCnt+'"/>'
        list.insertAdjacentHTML('beforebegin', input);
      }
      list.dataset.jets = 'content'+makeFilterableCnt;
      
      var tbody = (list.tagName == 'TABLE')? " tbody": '';
      var options = {
        searchTag: searchqs,
        contentTag: '[data-jets="content'+makeFilterableCnt+'"]'+tbody
      };
      if(list.dataset.filtercols) {
        var cols = list.dataset.filtercols.split(/[^\d]+/g);
        var optcols = [];
        for(var ii=0; ii<cols.length; ii++) {
          var j = parseInt(cols[ii].trim());
          if(!isNaN(j) && j>=0) optcols.push(j);
        }
        if(optcols.length) options.columns = optcols;
      }
      var x = new Jets(options);
      list.style.marginTop = '.5em';
    }
  }
  
  document.addEventListener('DOMContentLoaded', makeFilterable);
})(document.currentScript);
