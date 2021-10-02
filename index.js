function updateMap() {
    console.log("Updating map with realtime data")
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            // console.log(rsp.data)
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;

                cases = element.infected;
                if (cases > 255) {
                    color = "rgb(255, 0, 0)";
                }

                else {
                    color = `rgb(${cases}, 0, 0)`;
                }

                // Mark on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                }).setLngLat([longitude, latitude])
                    .addTo(map);

                // map.on('mousemove', 'state-fills', function (e) {
                //     if (e.features.length > 0) {
                //     if (hoveredStateId !== null) {
                //     map.setFeatureState(
                //     { source: 'states', id: hoveredStateId },
                //     { hover: false }
                //     );
                //     }
                //     hoveredStateId = e.features[0].id;
                //     map.setFeatureState(
                //     { source: 'states', id: hoveredStateId },
                //     { hover: true }
                //     );
                //     }
                //     });
            });
        })
}

let interval = 20000;
setInterval(updateMap, interval);