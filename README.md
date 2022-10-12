# Bakaláři - School List API


### API for getting schools list which using Bakaláři system.
#### *Typescript | Node.js | Fastify*

---

<br/><br/>
Simple API which fetch all schools and put them into json file. Although default date is Sunday midnight, you can change date when fetching would happen. This is possible by Fastify Cron plugin. At this time API sent requests by alphabet order and after all rewrite file of list.

On get request, at https://example.com/schools-list will be only provide whole json array of school objects.

<br/><br/>

#### Example of school object
```
{
"name":"Základní škola Aš, Kamenná 152, okres Cheb",
"url":"https://zskamenna.bakalari.cz/"
}
```

Object contain only name and url of logging site to system.
> If you want id of school in response too, you can just uncomment id at __[schools.repository.ts](https://github.com/michalmacenka/bakalar-school-list-api/blob/main/src/modules/schools/schools.repository.ts)__ 
