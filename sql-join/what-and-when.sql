select "films"."releaseYear",
       "categories"."name" as "category",
       "films"."title"
from "filmCategory"
join "films" using ("filmId")
join "categories" using ("categoryId")
where "films"."title" = 'Boogie Amelie';
