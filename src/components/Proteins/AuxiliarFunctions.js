// Function to know if a point is over a line segment within a certain margin
export function getVector(p, q) {
    return {x: q.x - p.x, y: q.y - p.y};
}

export function getMagnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function getNormalized(v) {
    let mag = getMagnitude(v);
    if (mag > 0.0001) {
        return {x: v.x / mag, y: v.y / mag};
    } else {
        return {x: 0, y: 0};
    }
}

// Function to know if a point is over a line segment within a certain margin
export function isPointOverLineSegment(point, start, end, margin = 7.0) {
    let result = false;

    let minPoint = {}, maxPoint = {};
    if (start.x < end.x)
    {
        minPoint.x = start.x;
        maxPoint.x = end.x;
    }
    else
    {
        minPoint.x = end.x;
        maxPoint.x = start.x;
    }
    if (start.y < end.y)
    {
        minPoint.y = start.y;
        maxPoint.y = end.y;
    }
    else
    {
        minPoint.y = end.y;
        maxPoint.y = start.y;
    }

    if (minPoint.x - margin <= point.x && point.x <= maxPoint.x + margin && minPoint.y - margin <= point.y && point.y <= maxPoint.y + margin)
    {
        let arrow_length = Math.sqrt((end.x - start.x) * (end.x - start.x) + (end.y - start.y) * (end.y - start.y));
        if (arrow_length > 0.001)
        {
            let distance = Math.abs((end.x - start.x) * (start.y - point.y) - (start.x - point.x) * (end.y - start.y)) / arrow_length;
            if (distance < margin)
            {
                result = true;
            }
        }
    }

    return result;
}

// Function to know if a point is inside a protein area
export function isPointOverProtein(point, prot) {
    let res = false;
    let x1 = prot.x - prot.w / 2;
    let x2 = prot.x + prot.w / 2;
    let y1 = prot.y - prot.h / 2;
    let y2 = prot.y + prot.h / 2;
    if (point.x >= x1 && point.x <= x2 && point.y >= y1 && point.y <= y2) {
        res = true;
    }
    return res;
}

// Function to know if two line segments intersect and to get the second segment intersecting proportion
export function segmentsIntersectionProportions(p1, p2, q1, q2, side = 0) {
    let r = {x: p2.x - p1.x, y: p2.y - p1.y};
    let s = {x: q2.x - q1.x, y: q2.y - q1.y};

    let denom = r.x * s.y - r.y * s.x;
    if (Math.abs(denom) < 0.0001) return null;

    let v = {x: q1.x - p1.x, y: q1.y - p1.y};
    let t = (v.x * s.y - v.y * s.x) / denom;
    if (t < 0 || t > 1) return null;
    let u = (v.x * r.y - v.y * r.x) / denom;
    if (u < 0 || u > 1) return null;

    return u + side;
}

export function getPointOverLineSegmentProportion(point, start, end) {
    let prop = -1;

    if (isPointOverLineSegment(point, start, end)) {
        let distPoint = Math.sqrt(Math.pow(point.x - start.x, 2) + Math.pow(point.y - start.y, 2));
        let distArrow = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        prop = distPoint / distArrow;
    }

    return prop;
}

export function getPointOverProteinProportion(startPoint, endPoint, prot) {
    let p1 = startPoint;
    let p2 = endPoint;

    let x1 = prot.x - prot.w / 2;
    let x2 = prot.x + prot.w / 2;
    let y1 = prot.y - prot.h / 2;
    let y2 = prot.y + prot.h / 2;

    let r1 = {x: x1, y: y1};
    let r2 = {x: x2, y: y1};
    let r3 = {x: x2, y: y2};
    let r4 = {x: x1, y: y2};

    let prop = segmentsIntersectionProportions(p1,p2,r1,r2, 0);
    if(prop == null) prop = segmentsIntersectionProportions(p1,p2,r2,r3, 1);
    if(prop == null) prop = segmentsIntersectionProportions(p1,p2,r3,r4, 2);
    if(prop == null) prop = segmentsIntersectionProportions(p1,p2,r4,r1, 3);
    return prop;
}