[![Docker version][docker-img]][docker-hub] [![Docker image size][docker-img-size]][docker-hub]
# Toggly controller

## API definition
### Features
|      Command       |  Verb  |         Resource              |
| :----------------: | :----: | :---------------------------: |
| List all features  | GET    | /api/features?field1=&field2= |
| Create feature     | POST   | /api/features                 |
| Retrieve a feature | GET    | /api/features/:id             |
| Update a feature   | PUT    | /api/features/:id             |
| Remove a feature   | DELETE | /api/features/:id             |


[docker-img]: https://img.shields.io/docker/v/pabloubal/toggly-controller?label=docker-hub&style=plastic
[docker-img-size]: https://img.shields.io/docker/image-size/pabloubal/toggly-controller?label=docker-image-size&style=plastic
[docker-hub]: https://hub.docker.com/r/pabloubal/toggly-controller