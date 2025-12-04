import * as turf from "@turf/turf"

export const raycasting = (point, polygon) => {
    const poi = turf.points([point])
    const pol = turf.polygon(polygon)

    const result = turf.pointsWithinPolygon(poi, pol);

    return result.features[0]?.geometry === poi.features[0].geometry
}