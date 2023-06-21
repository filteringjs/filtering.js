!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.filteringjs=t():e.filteringjs=t()}(this,(()=>(()=>{"use strict";var e={798:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FilterData=t.Filtering=void 0;const r=s(196),i=s(867);t.Filtering=class{#e;#t;constructor(e,t={}){this.#e=e,this.#t=t}get schema(){return this.#e}get options(){return this.#t}filter(e){const t=new r.Result(this.#e);let s=[];if(this.#t.filterItem)for(const t of this.#e.items)this.#t.filterItem(t,this.#e,e)&&s.push(t);else s=[...this.#e.items];for(const e of s)t.addAllItem(e);for(const r of this.#s(s,e))t.addFilteredItem(r);return this.#r(t,s,e),t}#r(e,t,s){for(const r of e.groupNames){const i=s.clone();i.disableGroup(r);const o=this.#s(t,i);for(const t of o)for(const s of t.getFilterNames(r))e.getGroup(r)?.getFilter(s)?.addPossibleItem(t)}}#s(e,t){const s=new Set;for(const r of e){let e=!0;for(const[s,o]of t.checkedFilters)if(o.size>0&&!(0,i.findOne)(r.getFilterNames(s),o)){e=!1;break}e&&s.add(r)}return s}};class o{#i=new Map;#o=new Set;get checkedFilters(){return this.#i}checkFilter(e,t){this.#o.has(e)||this.#a(e).add(t)}#a(e){return this.#i.has(e)||this.#i.set(e,new Set),this.#i.get(e)}disableGroup(e){this.#o.add(e),this.#i.delete(e)}clone(){const e=new o;for(const[t,s]of this.#i.entries())for(const r of s)e.checkFilter(t,r);for(const t of this.#o)e.disableGroup(t);return e}}t.FilterData=o},819:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FilteringFlow=void 0;const r=s(278),i=s(798);class o{#t;static defaultOptions={triggerFilterAfterInitializing:!0,disabledFilterClass:"disabled",filteredItemClass:"filtered"};#l;#e;#n;#c;constructor(e,t={}){this.#l=e,this.#t={...o.defaultOptions,...t},this.beforeInitializing(),this.#n=this.initializeParser(),this.#e=this.initializeSchema(),this.#c=this.initializeFiltering(),this.initializeFilterListener(),this.afterInitializing(),this.options.triggerFilterAfterInitializing&&this.filter()}get options(){return this.#t}get root(){return this.#l}get schema(){return this.#e}get parser(){return this.#n}get filtering(){return this.#c}beforeInitializing(){}initializeParser(){return new r.Parser(this.parserOptions)}get parserOptions(){}initializeSchema(){return this.parser.parseSchemaFromHtml(this.root)}initializeFiltering(){return new i.Filtering(this.schema,this.filteringOptions)}get filteringOptions(){}initializeFilterListener(){for(const e of this.schema.groups){const t=e.data.element;for(const s of e.filters){const r=s.data.element;r.addEventListener("click",(s=>{s.preventDefault(),r.classList.contains(this.options.disabledFilterClass)||this.beforeFilter(r)&&("all"===r.dataset.filterType?(this.#h(e),r.classList.toggle(this.parser.options.filterCheckedClass)):("single"!==t.dataset.selectType||r.classList.contains(this.parser.options.filterCheckedClass)||this.#h(e),r.classList.toggle(this.parser.options.filterCheckedClass)),this.filter())}))}}}#h(e){for(const t of e.filters)t.data.element.classList.remove(this.parser.options.filterCheckedClass)}afterInitializing(){}beforeFilter(e){return!0}filter(e){if(e)for(const t of this.schema.groups)for(const s of t.filters)s.data.element.classList.toggle(this.parser.options.filterCheckedClass,e.checkedFilters.get(t.name)?.has(s.name));else e=this.parser.parseCheckedFilterDataFromHtml(this.root);const t=this.filtering.filter(e);return this.handleFilterResult(t),t}handleFilterResult(e){for(const t of e.groups)for(const e of t.filters){const t=e.schemaFilter.data.element;"all"!==t.dataset.filterType&&t.classList.toggle(this.options.disabledFilterClass,0===e.possibleItems.length)}for(const t of e.allItems)t.data.element.classList.toggle(this.options.filteredItemClass,!e.filteredItems.includes(t));for(const t of this.schema.items)t.data.element.classList.toggle(this.options.filteredItemClass,!e.filteredItems.includes(t)||!e.allItems.includes(t))}}t.FilteringFlow=o},278:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Parser=void 0;const r=s(664),i=s(798);class o{static#u={groupClass:"filtering-group",filterClass:"filtering-filter",itemClass:"filtering-item",itemFilterNameAttributePrefix:"data-filter",filterCheckedClass:"checked"};#t;constructor(e={}){this.#t={...o.#u,...e}}get options(){return this.#t}parseSchemaFromHtml(e,t=new r.Schema){for(const s of this.parseGroupsAndFiltersFromHtml(e))t.addGroup(s);for(const s of this.parseItemsFromHtml(e))t.addItem(s);return t}parseGroupsAndFiltersFromHtml(e,t=null){const s=[];for(const t of e.getElementsByClassName(this.#t.groupClass)){const e=t.dataset.groupName;if(void 0===e)continue;const i=new r.Group(e,{element:t,label:t.dataset.groupLabel});for(const e of t.getElementsByClassName(this.#t.filterClass)){const t=e.dataset.filterName;if("all"!==e.dataset.filterType&&void 0===t)continue;const s=new r.Filter(t,{element:e,label:e.dataset.filterLabel});i.addFilter(s)}s.push(i)}if(null!==t)for(const e of s)t.addGroup(e);return s}parseItemsFromHtml(e,t=null){const s=[],i=new RegExp(`${this.#t.itemFilterNameAttributePrefix}-(?<groupName>.+)`,"i");for(const t of e.getElementsByClassName(this.#t.itemClass)){const e=new r.Item({element:t});for(const{name:s,value:r}of t.attributes){const t=s.match(i);if(t){const{groupName:s}=t.groups;for(const t of r.split(/\s*,\s*/))e.addFilter(s,t)}}s.push(e)}return null!==t&&t.addItems(s),s}parseCheckedFilterDataFromHtml(e){const t=new i.FilterData;for(const s of e.getElementsByClassName(this.#t.groupClass)){const e=s.dataset.groupName;for(const r of s.getElementsByClassName(this.#t.filterClass)){const s=r.dataset.filterName;r.classList.contains(this.#t.filterCheckedClass)&&("all"===r.dataset.filterType?t.disableGroup(e):t.checkFilter(e,s))}}return t}}t.Parser=o},196:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.FilterResult=t.GroupResult=t.Result=void 0,t.Result=class{#e;#d=new Map;constructor(e){this.#e=e,this.#f()}#f(){for(const e of this.schema.groups){const t=new s(e);for(const s of e.filters){const e=new r(s);t.addFilter(e)}this.#m(t)}}get schema(){return this.#e}get groups(){return[...this.#d.values()]}get groupNames(){return[...this.#d.keys()]}#m(e){this.#d.set(e.schemaGroup.name,e)}getGroup(e){return this.#d.get(e)}get filteredItems(){const e=new Set;for(const t of this.groups)for(const s of t.filteredItems)e.add(s);return[...e]}addFilteredItem(e){for(const t of e.getGroupNames())this.#d.get(t).addFilteredItem(e)}get allItems(){const e=new Set;for(const t of this.groups)for(const s of t.allItems)e.add(s);return[...e]}addAllItem(e){for(const t of e.getGroupNames())this.#d.get(t).addAllItem(e)}};class s{#p;#g=new Map;constructor(e){this.#p=e}get schemaGroup(){return this.#p}get filters(){return[...this.#g.values()]}addFilter(e){this.#g.set(e.schemaFilter.name,e)}getFilter(e){return this.#g.get(e)}get filteredItems(){const e=new Set;for(const t of this.filters)for(const s of t.filteredItems)e.add(s);return[...e]}addFilteredItem(e){for(const t of e.getFilterNames(this.schemaGroup.name))this.#g.get(t)?.addFilteredItem(e)}get allItems(){const e=new Set;for(const t of this.filters)for(const s of t.allItems)e.add(s);return[...e]}addAllItem(e){for(const t of e.getFilterNames(this.schemaGroup.name))this.#g.get(t)?.addAllItem(e)}}t.GroupResult=s;class r{#F;#I=new Set;#b=new Set;#G=new Set;constructor(e){this.#F=e}get schemaFilter(){return this.#F}get filteredItems(){return[...this.#I]}addFilteredItem(e){this.#I.add(e),this.addPossibleItem(e),this.addAllItem(e)}get possibleItems(){return[...this.#b]}addPossibleItem(e){this.#b.add(e),this.addAllItem(e)}get allItems(){return[...this.#G]}addAllItem(e){this.#G.add(e)}}t.FilterResult=r},664:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Item=t.Filter=t.Group=t.Schema=void 0,t.Schema=class{#d=new Map;#w=[];#v;constructor(e){this.#v=e}get groups(){return[...this.#d.values()]}getGroup(e){return this.#d.get(e)}addGroup(e){if(this.#d.has(e.name))throw new Error(`Group with name ${e.name} already added to schema. Group names have to be unique.`);this.#d.set(e.name,e),e.schema=this}get items(){return this.#w}addItem(e){this.#w.push(e)}addItems(e){for(const t of e)this.addItem(t)}get data(){return this.#v}},t.Group=class{#C;#e;#g=new Map;#v;constructor(e,t){this.#C=e,this.#v=t}get name(){return this.#C}get schema(){return this.#e}set schema(e){this.#e=e}get filters(){return[...this.#g.values()]}getFilter(e){return this.#g.get(e)}addFilter(e){if(this.#g.has(e.name))throw new Error(`Filter with name ${e.name} already in group ${this.name}. Filter names have to be unique in a Group.`);this.#g.set(e.name,e),e.group=this}getFilterNames(){return[...this.#g.keys()]}get data(){return this.#v}},t.Filter=class{#C;#y;#v;constructor(e,t){this.#C=e,this.#v=t}get name(){return this.#C}get group(){return this.#y}set group(e){this.#y=e}get data(){return this.#v}},t.Item=class{#v;#d=new Map;constructor(e){this.#v=e}get data(){return this.#v}getGroupNames(){return new Set(this.#d.keys())}addFilter(e,t){this.#a(e).add(t)}#a(e){return this.#d.has(e)||this.#d.set(e,new Set),this.#d.get(e)}getFilterNames(e){return this.#d.has(e)?new Set(this.#d.get(e)):new Set}}},867:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.findOne=void 0,t.findOne=function(e,t){for(const s of t)if(e.has(s))return!0;return!1}}},t={};function s(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,s),o.exports}var r={};return(()=>{var e=r;Object.defineProperty(e,"__esModule",{value:!0}),e.FilterData=e.FilteringFlow=e.Parser=e.Schema=e.Item=e.Group=e.Filter=e.Filtering=void 0;var t=s(798);Object.defineProperty(e,"Filtering",{enumerable:!0,get:function(){return t.Filtering}});var i=s(664);Object.defineProperty(e,"Filter",{enumerable:!0,get:function(){return i.Filter}}),Object.defineProperty(e,"Group",{enumerable:!0,get:function(){return i.Group}}),Object.defineProperty(e,"Item",{enumerable:!0,get:function(){return i.Item}}),Object.defineProperty(e,"Schema",{enumerable:!0,get:function(){return i.Schema}});var o=s(278);Object.defineProperty(e,"Parser",{enumerable:!0,get:function(){return o.Parser}});var a=s(819);Object.defineProperty(e,"FilteringFlow",{enumerable:!0,get:function(){return a.FilteringFlow}});var l=s(798);Object.defineProperty(e,"FilterData",{enumerable:!0,get:function(){return l.FilterData}})})(),r})()));