select "categories"."name" as "category",
       count(*) as "appearances"
from "castMembers"
join "actors" using ("actorId")
join "filmCategory" using ("filmId")
join "categories" using ("categoryId")
where "actors"."firstName" = 'Lisa' AND "actors"."lastName" = 'Monroe'
group by "categories"."name";
