select count(*) as "countOfCities",
       "countries"."name" as "country"
from "cities"
join "countries" using ("countryId")
group by "country";
