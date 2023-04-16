import maplibregl from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [-118.805, 34.027],
  zoom: 12
})

map.once('load', () => {
  map.addSource('hillshade', {
    type: 'raster',
    tiles: [
      'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
    ]
  })

  const layers = map.getStyle().layers

  const bottomLayer = layers.find((layer) => layer.type !== 'background')

  map.addLayer({
    id: 'hillshade-raster',
    type: 'raster',
    source: 'hillshade'    
  }, bottomLayer?.id)

  layers.forEach((layer) => {
    if (layer.type === "fill" && !layer.id.match(/(Water area|Marine area|Bathymetry|Building)/)) {
      map.setPaintProperty(layer.id, "fill-opacity", 0.5);
    }
  })
})
