import * as turf from "@turf/turf"

export const raycasting = (point, polygon, type) => {
    const poi = turf.points([point])
    let pol;
    if (type == "Polygon") {
        pol = turf.polygon(polygon)
    } else if (type == "MultiPolygon") {
        pol = turf.multiPolygon(polygon)
    }

    const result = turf.pointsWithinPolygon(poi, pol);

    return result.features[0]?.geometry === poi.features[0].geometry
}