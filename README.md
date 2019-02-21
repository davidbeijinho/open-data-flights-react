# Data visualization

Detailed air passenger transport by reporting country and routes 

## Data source:

	https://ec.europa.eu/eurostat/data/database?node_code=avia_par

	https://ec.europa.eu/eurostat/cache/metadata/en/avia_esms.htm



## Example url to download

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
	
	Info:
	https://datahub.io/core/airport-codes
	
	File Url:
	https://datahub.io/core/airport-codes/r/airport-codes.json


### Airports file information


| Field Name   | Order | Type (Format)    | Description              |
| ------------ | ----- | ---------------- | ------------------------ |
| ident        | 1     | string (default) | 4-letter ICAO code.      |
| type         | 2     | string (default) | type of the airport      |
| name         | 3     | string (default) | name of the airport      |
| elevation_ft | 4     | string (default) | elevantion in feets      |
| continent    | 5     | string (default) | continet code or NA      |
| iso_country  | 6     | string (default) | iso country code         |
| iso_region   | 7     | string (default) | iso code region          |
| municipality | 8     | string (default) | name of the municipality |
| gps_code     | 9     | string (default) | ???                      |
| iata_code    | 10    | string (default) | iata code                |
| local_code   | 11    | string (default) | ???                      |
| coordinates  | 12    | string (default) | latitude, longitude      |



## Countries Information
	
	Info:
	https://datahub.io/core/country-list

	File Url:
	https://datahub.io/core/country-list/r/data.json
	 	
### Coutries data format

| Field Name | Order | Type (Format ) | Description                            |
| ---------- | ----- | -------------- | -------------------------------------- |
| Name       | 1     | string         | Country Name                           |
| Code       | 2     | string         | ISO 2-digit code from ISO 3166-alpha-2 |
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 	
	 		
	 	
	 	
