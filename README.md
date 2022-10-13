# Bakaláři - School List API


### API for getting schools list which is using Bakaláři system.
#### *Typescript | Node.js | Fastify*

---

<br/><br/>
Simple API to fetch all schools and put them into json file. Although default date is Sunday midnight, you can change that date while it is all fetching. This is possible because of Fastify Cron plugin. At that moment API sends requests in alphabetic order and after all requests it rewrites the json file of the list.

On GET request, at https://example.com/schools-list endpoint will only provide whole json array of school objects.

<br/><br/>

#### Example of school object
```
{
"name":"Základní škola Aš, Kamenná 152, okres Cheb",
"url":"https://zskamenna.bakalari.cz/"
}
```

Object contains only name and url of logging site to system.
> If you want the id of the school in response too, you can just uncomment `id` at __[schools.repository.ts](https://github.com/michalmacenka/bakalar-school-list-api/blob/main/src/modules/schools/schools.repository.ts?plain=1#L94)__ 
