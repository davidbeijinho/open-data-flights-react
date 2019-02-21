# Data visualization

Detailed air passenger transport by reporting country and routes 

## Data source:

	https://ec.europa.eu/eurostat/data/database?node_code=avia_par

	https://ec.europa.eu/eurostat/cache/metadata/en/avia_esms.htm



## URL to download

	https://ec.europa.eu/eurostat/estat-navtree-portlet-prod/BulkDownloadListing?file=data/avia_par_be.tsv.gz


## DataMaps library		


### To have a look:
	https://github.com/markmarkoh/datamaps
	https://github.com/btmills/react-datamaps


### arc animation
	http://datamaps.github.io/old


## Data structure

### Measure

| Code        | Description                                   |
| ----------- | --------------------------------------------- |
| PAS_BRD     | Passengers on board                           |
| PAS_BRD_ARR | Passengers on board (arrivals)                |
| PAS_BRD_DEP | Passengers on board (departures)              |
| PAS_CRD     | Passengers carried                            |
| PAS_CRD_ARR | Passengers carried (arrival)                  |
| PAS_CRD_DEP | Passengers carried (departures)               |
| ST_PAS      | Passengers seats available                    |
| ST_PAS_ARR  | Passengers seats available (arrivals)         |
| ST_PAS_DEP  | Passengers seats available (departures)       |
| CAF_PAS     | Commercial passenger air flights              |
| CAF_PAS_ARR | Commercial passenger air flights (arrivals)   |
| CAF_PAS_DEP | Commercial passenger air flights (departures) |
	

### Unit

| Code   | Description      |
| ------ | ---------------- |
| PAS    | Passenger        |
| FLIGHT | Flight           |
| SEAT   | Seats and berths |



## Airport information

	https://openflights.org/data.html#airport
	
	File Url:
	https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat


### Airports file information

| key       | Name       | Description                                                                                                                                                                   |
| --------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | Airport ID | Unique OpenFlights identifier for this airport.                                                                                                                               |
| name      | Name       | Name of airport. May or may not contain the City name.                                                                                                                        |
| city      | City       | Main city served by airport. May be spelled differently from Name.                                                                                                            |
| country   | Country    | Country or territory where airport is located. See countries.dat to cross-reference to ISO 3166-1 codes.                                                                      |
| IATA      | IATA       | 3-letter IATA code. Null if not assigned/unknown.                                                                                                                             |
| ICAO      | ICAO       | 4-letter ICAO code. Null if not assigned.                                                                                                                                     |
| latitude  | Latitude   | Decimal degrees, usually to six significant digits. Negative is South, positive is North.                                                                                     |
| longitude | Longitude  | Decimal degrees, usually to six significant digits. Negative is West, positive is East.                                                                                       |
| altitude  | Altitude   | In feet.                                                                                                                                                                      |
| timezone  | Timezone   | Hours offset from UTC. Fractional hours are expressed as decimals, eg. India is 5.5.                                                                                          |
| DST       | DST        | Daylight savings time. One of E (Europe), A (US/Canada), S (South America), O (Australia), Z (New Zealand), N (None) or U (Unknown). See also: Help: Time  database time zone |
| tz        | Tz         | Timezone in "tz" (Olson) format, eg. "America/Los_Angeles".                                                                                                                   |
| type      | Type       | Type of the airport. Value "airport" for air terminals, "station" for train stations, "port" for ferry terminals and "unknown" if not known.                                  |
| source    | Source     | Source of this data. "OurAirports" for data sourced from OurAirports, "Legacy" for old data, "User" for unverified user contributions.                                        |


## Countries Information

	https://datahub.io/core/country-list
	https://datahub.io/core/country-list/r/data.json
	 	
### Coutries data format

| Field Name | Order | Type (Format ) | Description                            |
| ---------- | ----- | -------------- | -------------------------------------- |
| Name       | 1     | string         | Country Name                           |
| Code       | 2     | string         | ISO 2-digit code from ISO 3166-alpha-2 |
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 		
	 	
	 	
