!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("filteringjs",[],t):"object"==typeof exports?exports.filteringjs=t():e.filteringjs=t()}(this,(()=>(()=>{"use strict";var e={d:(t,s)=>{for(var r in s)e.o(s,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:s[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Filter:()=>m,FilterData:()=>c,Filtering:()=>a,FilteringParser:()=>u,Group:()=>n,Item:()=>d,Schema:()=>l});class s{#e;#t=new Map;#s=new Set;#r=new Set;constructor(e){this.#e=e}get schema(){return this.#e}get groups(){return[...this.#t.values()]}get groupNames(){return[...this.#t.keys()]}addGroup(e){this.#t.set(e.schemaGroup.name,e)}getGroup(e){return this.#t.get(e)}get filteredItems(){return[...this.#s]}addFilteredItem(e){this.#s.add(e);for(const t of e.getGroupNames())this.#t.get(t).addFilteredItem(e)}get allItems(){return[...this.#r]}addAllItem(e){this.#r.add(e);for(const t of e.getGroupNames())this.#t.get(t).addAllItem(e)}}class r{#i;#o=new Map;#s=new Set;#r=new Set;constructor(e){this.#i=e}get schemaGroup(){return this.#i}get filters(){return[...this.#o.values()]}addFilter(e){this.#o.set(e.schemaFilter.name,e)}getFilter(e){return this.#o.get(e)}addFilteredItem(e){this.#s.add(e);for(const t of e.getFilterNames(this.schemaGroup.name))this.#o.get(t).addFilteredItem(e)}addAllItem(e){this.#r.add(e);for(const t of e.getFilterNames(this.schemaGroup.name))this.#o.get(t).addAllItem(e)}}class i{#a;#s=new Set;#l=new Set;#r=new Set;constructor(e){this.#a=e}get schemaFilter(){return this.#a}get filteredItems(){return[...this.#s]}addFilteredItem(e){this.#s.add(e)}get possibleItems(){return[...this.#l]}addPossibleItem(e){this.#l.add(e)}get allItems(){return[...this.#r]}addAllItem(e){this.#r.add(e)}}function o(e,t){for(const s of t)if(e.has(s))return!0;return!1}class a{schema;options;constructor(e,t={}){this.schema=e,this.options=t}filter(e){const t=this.createEmptyResult(this.schema);let s=[];if(this.options.filterItem)for(const t of this.schema.items)this.options.filterItem(t,this.schema,e)&&s.push(t);else s=[...this.schema.items];for(const e of s)t.addAllItem(e);for(const r of this.getFilterItems(s,e))t.addFilteredItem(r);return this.calculatePossibleItems(t,s,e),t}createEmptyResult(e){const t=new s(e);for(const s of e.groups){const e=new r(s);for(const t of s.filters){const s=new i(t);e.addFilter(s)}t.addGroup(e)}return t}calculatePossibleItems(e,t,s){for(const r of e.groupNames){const i=s.clone();i.disableGroup(r);const o=this.getFilterItems(t,i);for(const t of o)for(const s of t.getFilterNames(r))e.getGroup(r).getFilter(s).addPossibleItem(t)}}getFilterItems(e,t){const s=new Set;for(const r of e){let e=!0;for(const[s,i]of t.checkedFilters)if(i.size>0&&!o(r.getFilterNames(s),i)){e=!1;break}e&&s.add(r)}return s}}class l{#t=new Map;#n=[];#m;constructor(e){this.#m=e}get groups(){return[...this.#t.values()]}get items(){return this.#n}addGroup(e){if(this.#t.has(e.name))throw new Error(`Group with name ${e.name} already added to schema. Group names have to be unique.`);this.#t.set(e.name,e)}addItem(e){this.#n.push(e)}addItems(e){for(const t of e)this.addItem(t)}get data(){return this.#m}}class n{#d;#o=new Map;#m;constructor(e,t){this.#d=e,this.#m=t}get name(){return this.#d}get filters(){return[...this.#o.values()]}addFilter(e){if(this.#o.has(e.name))throw new Error(`Filter with name ${e.name} already in group ${this.name}. Filter names have to be unique in a Group.`);this.#o.set(e.name,e)}getFilterNames(){return new Set(this.#o.keys())}get data(){return this.#m}}class m{#d;#m;constructor(e,t){this.#d=e,this.#m=t}get name(){return this.#d}get data(){return this.#m}}class d{#m;#t=new Map;constructor(e){this.#m=e}get data(){return this.#m}getGroupNames(){return new Set(this.#t.keys())}addFilter(e,t){this.#c(e).add(t)}#c(e){return this.#t.has(e)||this.#t.set(e,new Set),this.#t.get(e)}getFilterNames(e){return this.#t.has(e)?new Set(this.#t.get(e)):new Set}}class c{#u=new Map;get checkedFilters(){return this.#u}enableFilter(e,t){this.#c(e).add(t)}enableAllFilter(e){this.#c(e).clear()}#c(e){return this.#u.has(e)||this.#u.set(e,new Set),this.#u.get(e)}enableGroup(e){this.#u.delete(e),this.enableAllFilter(e)}disableGroup(e){this.#u.delete(e)}clone(){const e=new c;for(const[t,s]of this.#u.entries())for(const r of s)e.enableFilter(t,r);return e}}class u{static#h={groupClass:"filtering-group",filterClass:"filtering-filter",itemClass:"filtering-item",itemFilterNameAttributePrefix:"data-filter",filterCheckedClass:"checked"};#f;constructor(e){this.#f={...u.#h,...e}}parseSchemaFromHtml(e,t=new l){this.parseGroupsAndFiltersFromHtml(e,t);for(const s of this.parseItemsFromHtml(e))t.addItem(s);return t}parseGroupsAndFiltersFromHtml(e,t){const s=[...e.querySelectorAll(`.${this.#f.groupClass}`)];for(const e of s){const s=e.dataset.groupName;if(void 0===s)continue;const r=new n(s,{element:e,label:e.dataset.groupLabel}),i=[...e.querySelectorAll(`.${this.#f.filterClass}`)];for(const e of i){const t=e.dataset.filterName;if(void 0===t)continue;const s=new m(t,{element:e,label:e.dataset.filterLabel});r.addFilter(s)}t.addGroup(r)}}parseItemsFromHtml(e){const t=[],s=new RegExp(`${this.#f.itemFilterNameAttributePrefix}-(?<groupName>.+)`,"i"),r=[...e.querySelectorAll(`.${this.#f.itemClass}`)];for(const e of r){const r=new d({element:e});for(const{name:t,value:i}of e.attributes){const e=t.match(s);if(e){const{groupName:t}=e.groups;for(const e of i.split(/\s*,\s*/))r.addFilter(t,e)}}t.push(r)}return t}parseCheckedFilterDataFromHtml(e){const t=new c,s=[...e.querySelectorAll(`.${this.#f.groupClass}`)];for(const e of s){const s=e.dataset.groupName,r=[...e.querySelectorAll(`.${this.#f.filterClass}`)];for(const e of r){const r=e.dataset.filterName;e.classList.contains(this.#f.filterCheckedClass)&&t.enableFilter(s,r)}}return t}}return t})()));
//# sourceMappingURL=index.js.map