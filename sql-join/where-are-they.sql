select "addresses"."line1" as "address",
       "cities"."name" as "city",
       "addresses"."district",
       "countries"."name" as "country"
from "cities"
join "addresses" using ("cityId")
join "countries" using ("countryId");
