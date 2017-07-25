/*****************************************************************************\

	Perpetuum Software LLC
	Perfect Widgets SOFTWARE COMPONENT PRODUCT  
	Copyright (C) 2012 Perpetuum Software LLC

\*****************************************************************************/
// PerfectWidgets.Framework.js
(function() {
    Type.registerNamespace('PerfectWidgets.Framework.DataObjects');
    PerfectWidgets.Framework.DataObjects.RotationDirection = function() {};
    PerfectWidgets.Framework.DataObjects.RotationDirection.prototype = {
        noCycles: 0,
        clockwise: 1,
        anticlockwise: 2,
        nearestWay: 3
    }
    PerfectWidgets.Framework.DataObjects.RotationDirection.registerEnum('PerfectWidgets.Framework.DataObjects.RotationDirection', false);
    PerfectWidgets.Framework.DataObjects.Direction = function() {};
    PerfectWidgets.Framework.DataObjects.Direction.prototype = {
        x: 0,
        y: 1
    }
    PerfectWidgets.Framework.DataObjects.Direction.registerEnum('PerfectWidgets.Framework.DataObjects.Direction', false);
    PerfectWidgets.Framework.DataObjects.Ellipse = function(center, radii) {
        this.$0 = PerfectWidgets.Framework.DataObjects.Vector.empty;
        this.$1 = PerfectWidgets.Framework.DataObjects.Vector.empty;
        this.$0 = center;
        this.$1 = radii;
    }
    PerfectWidgets.Framework.DataObjects.Ellipse.prototype = {
        getCenter: function() {
            return this.$0;
        },
        setCenter: function(center) {
            this.$0 = center;
        },
        getRadii: function() {
            return this.$1;
        },
        setRadii: function(radii) {
            this.$1 = radii;
        }
    }
    PerfectWidgets.Framework.DataObjects.Matrix = function(rows, columns) {
        this.$0 = new Array(rows);
        for (var $0 = 0; $0 < rows; $0++) {
            this.$0[$0] = new Array(columns);
            for (var $1 = 0; $1 < rows; $1++) {
                this.$0[$0][$1] = 0;
            }
        }
        this.$1 = rows;
        this.$2 = columns;
    }
    PerfectWidgets.Framework.DataObjects.Matrix.eye = function(size) {
        var $0 = new PerfectWidgets.Framework.DataObjects.Matrix(size, size);
        for (var $1 = 0; $1 < size; $1++) {
            $0.set($1, $1, 1);
        }
        return $0;
    }
    PerfectWidgets.Framework.DataObjects.Matrix.buildTransformationMatrix = function(m11, m12, m21, m22, dx, dy) {
        var $0 = new PerfectWidgets.Framework.DataObjects.Matrix(3, 3);
        $0.set(0, 0, m11);
        $0.set(1, 0, m12);
        $0.set(0, 1, m21);
        $0.set(1, 1, m22);
        $0.set(0, 2, dx);
        $0.set(1, 2, dy);
        $0.set(2, 0, 0);
        $0.set(2, 1, 0);
        $0.set(2, 2, 1);
        return $0;
    }
    PerfectWidgets.Framework.DataObjects.Matrix.buildTranslationMatrix = function(tx, ty) {
        var $0 = new PerfectWidgets.Framework.DataObjects.Matrix(3, 3);
        $0.set(0, 0, 1);
        $0.set(0, 1, 0);
        $0.set(0, 2, tx);
        $0.set(1, 0, 0);
        $0.set(1, 1, 1);
        $0.set(1, 2, ty);
        $0.set(2, 0, 0);
        $0.set(2, 1, 0);
        $0.set(2, 2, 1);
        return $0;
    }
    PerfectWidgets.Framework.DataObjects.Matrix.buildScaleMatrix = function(sx, sy) {
        var $0 = new PerfectWidgets.Framework.DataObjects.Matrix(3, 3);
        $0.set(0, 0, sx);
        $0.set(0, 1, 0);
        $0.set(0, 2, 0);
        $0.set(1, 0, 0);
        $0.set(1, 1, sy);
        $0.set(1, 2, 0);
        $0.set(2, 0, 0);
        $0.set(2, 1, 0);
        $0.set(2, 2, 1);
        return $0;
    }
    PerfectWidgets.Framework.DataObjects.Matrix.buildRotationMatrix = function(angle) {
        var $0 = PerfectWidgets.Framework.Geometry.GeometryUtilities.degreeToRadian(angle);
        var $1 = new PerfectWidgets.Framework.DataObjects.Matrix(3, 3);
        $1.set(0, 0, Math.cos($0));
        $1.set(0, 1, -Math.sin($0));
        $1.set(0, 2, 0);
        $1.set(1, 0, Math.sin($0));
        $1.set(1, 1, Math.cos($0));
        $1.set(1, 2, 0);
        $1.set(2, 0, 0);
        $1.set(2, 1, 0);
        $1.set(2, 2, 1);
        return $1;
    }
    PerfectWidgets.Framework.DataObjects.Matrix.prototype = {
        $0: null,
        $1: 0,
        $2: 0,
        get: function(row, column) {
            return this.$0[row][column];
        },
        set: function(row, column, value) {
            this.$0[row][column] = value;
        },
        add: function(m) {
            var $0 = new PerfectWidgets.Framework.DataObjects.Matrix(this.$1, this.$2);
            for (var $1 = 0; $1 < this.$1; $1++) {
                for (var $2 = 0; $2 < this.$2; $2++) {
                    var $3 = this.get($1, $2) + m.get($1, $2);
                    $0.set($1, $2, $3);
                }
            }
            return $0;
        },
        minus: function(m) {
            var $0 = new PerfectWidgets.Framework.DataObjects.Matrix(this.$1, this.$2);
            for (var $1 = 0; $1 < this.$1; $1++) {
                for (var $2 = 0; $2 < this.$2; $2++) {
                    var $3 = this.get($1, $2) + m.get($1, $2);
                    $0.set($1, $2, $3);
                }
            }
            return $0;
        },
        multiply: function(m) {
            var $0 = new PerfectWidgets.Framework.DataObjects.Matrix(this.$1, m.$2);
            for (var $1 = 0; $1 < this.$1; $1++) {
                for (var $2 = 0; $2 < m.$2; $2++) {
                    var $3 = 0;
                    for (var $4 = 0; $4 < this.$2; $4++) {
                        $3 += this.get($1, $4) * m.get($4, $2);
                    }
                    $0.set($1, $2, $3);
                }
            }
            return $0;
        },
        reverse: function() {
            if (this.$1 !== 3 || this.$2 !== 3) {
                throw new Error('Matrix.Reverse() work only for 3x3 matrix');
            }
            var $0 = new PerfectWidgets.Framework.DataObjects.Matrix(3, 3);
            var $1 = this.get(0, 0);
            var $2 = this.get(0, 1);
            var $3 = this.get(0, 2);
            var $4 = this.get(1, 0);
            var $5 = this.get(1, 1);
            var $6 = this.get(1, 2);
            var $7 = this.get(2, 0);
            var $8 = this.get(2, 1);
            var $9 = this.get(2, 2);
            var $A = $5 * $9 - $6 * $8;
            var $B = $6 * $7 - $4 * $9;
            var $C = $4 * $8 - $5 * $7;
            var $D = $3 * $8 - $2 * $9;
            var $E = $1 * $9 - $3 * $7;
            var $F = $7 * $2 - $1 * $8;
            var $10 = $2 * $6 - $3 * $5;
            var $11 = $3 * $4 - $1 * $6;
            var $12 = $1 * $5 - $2 * $4;
            var $13 = $1 * ($5 * $9 - $6 * $7) + $2 * ($6 * $7 - $9 * $4) + $3 * ($4 * $8 - $5 * $7);
            $0.set(0, 0, $A / $13);
            $0.set(0, 1, $D / $13);
            $0.set(0, 2, $10 / $13);
            $0.set(1, 0, $B / $13);
            $0.set(1, 1, $E / $13);
            $0.set(1, 2, $11 / $13);
            $0.set(2, 0, $C / $13);
            $0.set(2, 1, $F / $13);
            $0.set(2, 2, $12 / $13);
            return $0;
        }
    }
    PerfectWidgets.Framework.DataObjects.RangeValue = function(minimum, maximum) {
        this.$1 = minimum;
        this.$0 = maximum;
    }
    PerfectWidgets.Framework.DataObjects.RangeValue.getRange = function(value, rangeSize, zeroPoint) {
        var $0 = Math.floor((value - zeroPoint) / rangeSize);
        var $1 = $0 * rangeSize + zeroPoint;
        var $2 = ($0 + 1) * rangeSize + zeroPoint;
        return new PerfectWidgets.Framework.DataObjects.RangeValue($1, $2);
    }
    PerfectWidgets.Framework.DataObjects.RangeValue.prototype = {
        $0: 0,
        getMaximum: function() {
            return this.$0;
        },
        setMaximum: function(maximumValue) {
            this.$0 = maximumValue;
        },
        $1: 0,
        getMinimum: function() {
            return this.$1;
        },
        setMinimum: function(minimumValue) {
            this.$1 = minimumValue;
        },
        toString: function() {
            return this.$1.toString() + ' - ' + this.$0.toString();
        }
    }
    PerfectWidgets.Framework.DataObjects.Segment = function(start, end) {
        this.$0 = start;
        this.$1 = end;
    }
    PerfectWidgets.Framework.DataObjects.Segment.prototype = {
        $0: 0,
        get_startValue: function() {
            return this.$0;
        },
        set_startValue: function(value) {
            this.$0 = value;
            return value;
        },
        $1: 0,
        get_endValue: function() {
            return this.$1;
        },
        set_endValue: function(value) {
            this.$1 = value;
            return value;
        }
    }
    PerfectWidgets.Framework.DataObjects.Point = function(x, y) {
        this.x = x;
        this.y = y;
    }
    PerfectWidgets.Framework.DataObjects.Point.prototype = {
        x: 0,
        y: 0
    }
    PerfectWidgets.Framework.DataObjects.Vector = function(x, y) {
        this.x = x;
        this.y = y;
    }
    PerfectWidgets.Framework.DataObjects.Vector.fromPolar = function(Length, angle) {
        return new PerfectWidgets.Framework.DataObjects.Vector(Length * Math.cos(angle), Length * Math.sin(angle));
    }
    PerfectWidgets.Framework.DataObjects.Vector.toDegrees = function(angle) {
        return angle / Math.PI * 180;
    }
    PerfectWidgets.Framework.DataObjects.Vector.toRadians = function(angle) {
        return angle * Math.PI / 180;
    }
    PerfectWidgets.Framework.DataObjects.Vector.prototype = {
        x: 0,
        y: 0,
        getRotation: function() {
            var $0 = Math.atan2(this.y, this.x);
            if ($0 < 0) {
                $0 += Math.PI * 2;
            }
            return $0;
        },
        setRotation: function(value) {
            var $0 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getLength(), value);
            this.x = $0.x;
            this.y = $0.y;
        },
        getWidth: function() {
            return this.x;
        },
        getHeight: function() {
            return this.y;
        },
        getX: function() {
            return this.x;
        },
        getY: function() {
            return this.y;
        },
        setX: function(val) {
            this.x = val;
        },
        setY: function(val) {
            this.y = val;
        },
        getLength: function() {
            return this.abs();
        },
        setLength: function(value) {
            var $0 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(value, this.getRotation());
            this.x = $0.x;
            this.y = $0.y;
        },
        isEmpty: function() {
            return (!this.x) && (!this.y);
        },
        toString: function() {
            return this.x + ',' + this.y;
        },
        convertUnits: function(fromUnit, toUnit) {
            var $0 = fromUnit.k / toUnit.k;
            return new PerfectWidgets.Framework.DataObjects.Vector(this.x * $0, this.y * $0);
        },
        abs: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        quant: function(xGrid, yGrid) {
            var $0;
            var $1;
            if (!!xGrid) {
                $0 = Math.round(this.x / xGrid) * xGrid;
            } else {
                $0 = this.x;
            }
            if (!!yGrid) {
                $1 = Math.round(this.y / yGrid) * yGrid;
            } else {
                $1 = this.y;
            }
            return new PerfectWidgets.Framework.DataObjects.Vector($0, $1);
        },
        quantX: function(xGrid) {
            return this.quant(xGrid, 0);
        },
        quantY: function(yGrid) {
            return this.quant(0, yGrid);
        },
        getNormalized: function() {
            return PerfectWidgets.Framework.DataObjects.Vector.fromPolar(1, this.getRotation());
        },
        getPerpendicular: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.y, -this.x);
        },
        getProjection: function(startPoint, endPoint) {
            if (!endPoint.minus(startPoint).getLength()) {
                return startPoint;
            }
            if (endPoint.y === startPoint.y) {
                return new PerfectWidgets.Framework.DataObjects.Vector(this.x, startPoint.y);
            } else {
                var $0 = (startPoint.x - endPoint.x) / (endPoint.y - startPoint.y);
                var $1 = ($0 * (startPoint.y - this.y) + startPoint.x + $0 * $0 * this.x) / ($0 * $0 + 1);
                var $2 = $0 * $1 + this.y - $0 * this.x;
                return new PerfectWidgets.Framework.DataObjects.Vector($1, $2);
            }
        },
        rotate: function(angle) {
            var $0 = new PerfectWidgets.Framework.DataObjects.Vector(this.x, this.y);
            var $1 = $0.getRotation();
            $1 += angle;
            $0.setRotation($1);
            return $0;
        },
        add: function(v) {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.x + v.x, this.y + v.y);
        },
        minus: function(v) {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.x - v.x, this.y - v.y);
        },
        multiply: function(v) {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.x * v.x, this.y * v.y);
        },
        divide: function(v) {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.x / v.x, this.y / v.y);
        },
        divideByNumber: function(v) {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.x / v, this.y / v);
        },
        multiplyByNumber: function(v) {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.x * v, this.y * v);
        },
        negative: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(-this.x, -this.y);
        },
        equals: function(obj) {
            var $0 = Type.safeCast(obj, PerfectWidgets.Framework.DataObjects.Vector);
            if ($0 != null && this.x === $0.x && this.y === $0.y) {
                return true;
            }
            return false;
        }
    }
    PerfectWidgets.Framework.DataObjects.VectorRectangle = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    PerfectWidgets.Framework.DataObjects.VectorRectangle.intersect = function(a, b) {
        var $0 = a.getPositiveRectangle();
        var $1 = b.getPositiveRectangle();
        var $2 = Math.max($0.getLeft(), $1.getLeft());
        var $3 = Math.max($0.getTop(), $1.getTop());
        var $4 = Math.min($0.getRight(), $1.getRight());
        var $5 = Math.min($0.getBottom(), $1.getBottom());
        if ((($4 - $2) >= 0) && (($5 - $3) >= 0)) {
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle($2, $3, $4 - $2, $5 - $3);
        } else {
            return PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
        }
    }
    PerfectWidgets.Framework.DataObjects.VectorRectangle.union = function(a, b) {
        var $0 = a.getPositiveRectangle();
        var $1 = b.getPositiveRectangle();
        return new PerfectWidgets.Framework.DataObjects.VectorRectangle(Math.min($0.getLeft(), $1.getLeft()), Math.min($0.getTop(), $1.getTop()), Math.max($0.getRight(), $1.getRight()) - Math.min($0.getLeft(), $1.getLeft()), Math.max($0.getBottom(), $1.getBottom()) - Math.min($0.getTop(), $1.getTop()));
    }
    PerfectWidgets.Framework.DataObjects.VectorRectangle.multiply = function(v, m) {
        return new PerfectWidgets.Framework.DataObjects.VectorRectangle(v.x * m, v.y * m, v.width * m, v.height * m);
    }
    PerfectWidgets.Framework.DataObjects.VectorRectangle.divide = function(v, m) {
        return new PerfectWidgets.Framework.DataObjects.VectorRectangle(v.x / m, v.y / m, v.width / m, v.height / m);
    }
    PerfectWidgets.Framework.DataObjects.VectorRectangle.expand = function(v, m) {
        return new PerfectWidgets.Framework.DataObjects.VectorRectangle(v.x - m.left, v.y - m.top, v.width + m.left + m.right, v.height + m.top + m.bottom);
    }
    PerfectWidgets.Framework.DataObjects.VectorRectangle.shrink = function(v, m) {
        if (m.left + m.right >= v.width || m.top + m.bottom >= v.height) {
            return PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
        }
        return new PerfectWidgets.Framework.DataObjects.VectorRectangle(v.x + m.left, v.y + m.top, v.width - m.left - m.right, v.height - m.top - m.bottom);
    }
    PerfectWidgets.Framework.DataObjects.VectorRectangle.prototype = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        getX: function() {
            return this.x;
        },
        getY: function() {
            return this.y;
        },
        getWidth: function() {
            return this.width;
        },
        getHeight: function() {
            return this.height;
        },
        getTop: function() {
            return this.y;
        },
        getBottom: function() {
            return this.y + this.height;
        },
        getLeft: function() {
            return this.x;
        },
        getRight: function() {
            return this.x + this.width;
        },
        getTopLeft: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.getLeft(), this.getTop());
        },
        getBottomLeft: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.getLeft(), this.getBottom());
        },
        getTopRight: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.getRight(), this.getTop());
        },
        getBottomRight: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.getRight(), this.getBottom());
        },
        getCenterX: function() {
            return this.x + this.width / 2;
        },
        getCenterY: function() {
            return this.y + this.height / 2;
        },
        getTopCenter: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.getCenterX(), this.getTop());
        },
        getBottomCenter: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.getCenterX(), this.getBottom());
        },
        getLeftCenter: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.getLeft(), this.getCenterY());
        },
        getRightCenter: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.getRight(), this.getCenterY());
        },
        getCenter: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.getCenterX(), this.getCenterY());
        },
        getSize: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.width, this.height);
        },
        getLocation: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.x, this.y);
        },
        convertUnits: function(fromUnit, toUnit) {
            var $0 = fromUnit.k / toUnit.k;
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle(this.x * $0, this.y * $0, this.width * $0, this.height * $0);
        },
        getDistance: function(p) {
            if (this.contains(p)) {
                return 0;
            } else {
                var $0 = 0;
                var $1 = 0;
                if (p.x >= this.getLeft() && p.x <= this.getRight()) {
                    $0 = 0;
                } else {
                    $0 = Math.min(Math.abs(p.x - this.getLeft()), Math.abs(p.x - this.getRight()));
                }
                if (p.y >= this.getTop() && p.y <= this.getBottom()) {
                    $1 = 0;
                } else {
                    $1 = Math.min(Math.abs(p.y - this.getTop()), Math.abs(p.y - this.getBottom()));
                }
                return Math.sqrt($0 * $0 + $1 * $1);
            }
        },
        contains: function(v) {
            return (this.getLeft() <= v.x && v.x <= this.getRight() && this.getTop() <= v.y && v.y <= this.getBottom());
        },
        getPositiveRectangle: function() {
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle(Math.min(this.getLeft(), this.getRight()), Math.min(this.getTop(), this.getBottom()), Math.abs(this.width), Math.abs(this.height));
        },
        isEmpty: function() {
            return (!this.width) && (!this.height);
        },
        getArea: function() {
            return this.width * this.height;
        },
        getVertice: function() {
            return [this.getTopLeft(), this.getBottomLeft(), this.getBottomRight(), this.getTopRight()];
        },
        equals: function(obj) {
            var $0 = Type.safeCast(obj, PerfectWidgets.Framework.DataObjects.VectorRectangle);
            if ($0 != null && this.x === $0.x && this.y === $0.y && this.width === $0.width && this.height === $0.height) {
                return true;
            }
            return false;
        }
    }
    Type.registerNamespace('PerfectWidgets.Framework.Drawing');
    PerfectWidgets.Framework.Drawing.FontStyle = function() {};
    PerfectWidgets.Framework.Drawing.FontStyle.prototype = {
        regular: 0,
        bold: 1,
        italic: 2,
        underline: 4,
        strikeout: 8
    }
    PerfectWidgets.Framework.Drawing.FontStyle.registerEnum('PerfectWidgets.Framework.Drawing.FontStyle', false);
    PerfectWidgets.Framework.Drawing.GraphicsPathElementType = function() {};
    PerfectWidgets.Framework.Drawing.GraphicsPathElementType.prototype = {
        moveTo: 0,
        lineTo: 1,
        closePath: 2,
        horizontalLineTo: 3,
        verticalLineTo: 4,
        ellipticalArc: 5
    }
    PerfectWidgets.Framework.Drawing.GraphicsPathElementType.registerEnum('PerfectWidgets.Framework.Drawing.GraphicsPathElementType', false);
    PerfectWidgets.Framework.Drawing.HatchStyle = function() {};
    PerfectWidgets.Framework.Drawing.HatchStyle.prototype = {
        backwardDiagonal: 3,
        cross: 4,
        darkDownwardDiagonal: 20,
        darkHorizontal: 29,
        darkUpwardDiagonal: 21,
        darkVertical: 28,
        dashedDownwardDiagonal: 30,
        dashedHorizontal: 32,
        dashedUpwardDiagonal: 31,
        dashedVertical: 33,
        diagonalBrick: 38,
        diagonalCross: 5,
        divot: 42,
        dottedDiamond: 44,
        dottedGrid: 43,
        forwardDiagonal: 2,
        horizontal: 0,
        horizontalBrick: 39,
        largeCheckerBoard: 50,
        largeConfetti: 35,
        largeGrid: 4,
        lightDownwardDiagonal: 18,
        lightHorizontal: 25,
        lightUpwardDiagonal: 19,
        lightVertical: 24,
        max: 4,
        min: 0,
        narrowHorizontal: 27,
        narrowVertical: 26,
        outlinedDiamond: 51,
        percent05: 6,
        percent10: 7,
        percent20: 8,
        percent25: 9,
        percent30: 10,
        percent40: 11,
        percent50: 12,
        percent60: 13,
        percent70: 14,
        percent75: 15,
        percent80: 16,
        percent90: 17,
        plaid: 41,
        shingle: 45,
        smallCheckerBoard: 49,
        smallConfetti: 34,
        smallGrid: 48,
        solidDiamond: 52,
        sphere: 47,
        trellis: 46,
        vertical: 1,
        wave: 37,
        weave: 40,
        wideDownwardDiagonal: 22,
        wideUpwardDiagonal: 23,
        zigZag: 36
    }
    PerfectWidgets.Framework.Drawing.HatchStyle.registerEnum('PerfectWidgets.Framework.Drawing.HatchStyle', false);
    PerfectWidgets.Framework.Drawing._IPathElement = function() {};
    PerfectWidgets.Framework.Drawing._IPathElement.registerInterface('PerfectWidgets.Framework.Drawing._IPathElement');
    PerfectWidgets.Framework.Drawing.PathPointType = function() {};
    PerfectWidgets.Framework.Drawing.PathPointType.prototype = {
        start: 0,
        line: 1,
        bezier3: 3,
        bezier: 3,
        pathTypeMask: 7,
        dashMode: 16,
        pathMarker: 32,
        closeSubpath: 128
    }
    PerfectWidgets.Framework.Drawing.PathPointType.registerEnum('PerfectWidgets.Framework.Drawing.PathPointType', false);
    PerfectWidgets.Framework.Drawing.ContentAlignment = function() {};
    PerfectWidgets.Framework.Drawing.ContentAlignment.prototype = {
        topLeft: 1,
        topCenter: 2,
        topRight: 4,
        middleLeft: 16,
        middleCenter: 32,
        middleRight: 64,
        bottomLeft: 256,
        bottomCenter: 512,
        bottomRight: 1024
    }
    PerfectWidgets.Framework.Drawing.ContentAlignment.registerEnum('PerfectWidgets.Framework.Drawing.ContentAlignment', false);
    PerfectWidgets.Framework.Drawing.DashCap = function() {};
    PerfectWidgets.Framework.Drawing.DashCap.prototype = {
        flat: 0,
        round: 2,
        triangle: 3
    }
    PerfectWidgets.Framework.Drawing.DashCap.registerEnum('PerfectWidgets.Framework.Drawing.DashCap', false);
    PerfectWidgets.Framework.Drawing.DashStyle = function() {};
    PerfectWidgets.Framework.Drawing.DashStyle.prototype = {
        empty: 0,
        solid: 1,
        dash: 2,
        dot: 3,
        dashDot: 4,
        dashDotDot: 5,
        custom: 6
    }
    PerfectWidgets.Framework.Drawing.DashStyle.registerEnum('PerfectWidgets.Framework.Drawing.DashStyle', false);
    PerfectWidgets.Framework.Drawing.FillMode = function() {};
    PerfectWidgets.Framework.Drawing.FillMode.prototype = {
        alternate: 0,
        winding: 1
    }
    PerfectWidgets.Framework.Drawing.FillMode.registerEnum('PerfectWidgets.Framework.Drawing.FillMode', false);
    PerfectWidgets.Framework.Drawing.GraphicsUnit = function() {};
    PerfectWidgets.Framework.Drawing.GraphicsUnit.prototype = {
        world: 0,
        display: 1,
        pixel: 2,
        point: 3,
        inch: 4,
        document: 5,
        millimeter: 6
    }
    PerfectWidgets.Framework.Drawing.GraphicsUnit.registerEnum('PerfectWidgets.Framework.Drawing.GraphicsUnit', false);
    PerfectWidgets.Framework.Drawing.KnownColor = function() {};
    PerfectWidgets.Framework.Drawing.KnownColor.prototype = {
        activeBorder: 1,
        activeCaption: 2,
        activeCaptionText: 3,
        aliceBlue: 28,
        antiqueWhite: 29,
        appWorkspace: 4,
        aqua: 30,
        aquamarine: 31,
        azure: 32,
        beige: 33,
        bisque: 34,
        black: 35,
        blanchedAlmond: 36,
        blue: 37,
        blueViolet: 38,
        brown: 39,
        burlyWood: 40,
        buttonFace: 168,
        buttonHighlight: 169,
        buttonShadow: 170,
        cadetBlue: 41,
        chartreuse: 42,
        chocolate: 43,
        control: 5,
        controlDark: 6,
        controlDarkDark: 7,
        controlLight: 8,
        controlLightLight: 9,
        controlText: 10,
        coral: 44,
        cornflowerBlue: 45,
        cornsilk: 46,
        crimson: 47,
        cyan: 48,
        darkBlue: 49,
        darkCyan: 50,
        darkGoldenrod: 51,
        darkGray: 52,
        darkGreen: 53,
        darkKhaki: 54,
        darkMagenta: 55,
        darkOliveGreen: 56,
        darkOrange: 57,
        darkOrchid: 58,
        darkRed: 59,
        darkSalmon: 60,
        darkSeaGreen: 61,
        darkSlateBlue: 62,
        darkSlateGray: 63,
        darkTurquoise: 64,
        darkViolet: 65,
        deepPink: 66,
        deepSkyBlue: 67,
        desktop: 11,
        dimGray: 68,
        dodgerBlue: 69,
        firebrick: 70,
        floralWhite: 71,
        forestGreen: 72,
        fuchsia: 73,
        gainsboro: 74,
        ghostWhite: 75,
        gold: 76,
        goldenrod: 77,
        gradientActiveCaption: 171,
        gradientInactiveCaption: 172,
        gray: 78,
        grayText: 12,
        green: 79,
        greenYellow: 80,
        highlight: 13,
        highlightText: 14,
        honeydew: 81,
        hotPink: 82,
        hotTrack: 15,
        inactiveBorder: 16,
        inactiveCaption: 17,
        inactiveCaptionText: 18,
        indianRed: 83,
        indigo: 84,
        info: 19,
        infoText: 20,
        ivory: 85,
        khaki: 86,
        lavender: 87,
        lavenderBlush: 88,
        lawnGreen: 89,
        lemonChiffon: 90,
        lightBlue: 91,
        lightCoral: 92,
        lightCyan: 93,
        lightGoldenrodYellow: 94,
        lightGray: 95,
        lightGreen: 96,
        lightPink: 97,
        lightSalmon: 98,
        lightSeaGreen: 99,
        lightSkyBlue: 100,
        lightSlateGray: 101,
        lightSteelBlue: 102,
        lightYellow: 103,
        lime: 104,
        limeGreen: 105,
        linen: 106,
        magenta: 107,
        maroon: 108,
        mediumAquamarine: 109,
        mediumBlue: 110,
        mediumOrchid: 111,
        mediumPurple: 112,
        mediumSeaGreen: 113,
        mediumSlateBlue: 114,
        mediumSpringGreen: 115,
        mediumTurquoise: 116,
        mediumVioletRed: 117,
        menu: 21,
        menuBar: 173,
        menuHighlight: 174,
        menuText: 22,
        midnightBlue: 118,
        mintCream: 119,
        mistyRose: 120,
        moccasin: 121,
        navajoWhite: 122,
        navy: 123,
        oldLace: 124,
        olive: 125,
        oliveDrab: 126,
        orange: 127,
        orangeRed: 128,
        orchid: 129,
        paleGoldenrod: 130,
        paleGreen: 131,
        paleTurquoise: 132,
        paleVioletRed: 133,
        papayaWhip: 134,
        peachPuff: 135,
        peru: 136,
        pink: 137,
        plum: 138,
        powderBlue: 139,
        purple: 140,
        red: 141,
        rosyBrown: 142,
        royalBlue: 143,
        saddleBrown: 144,
        salmon: 145,
        sandyBrown: 146,
        scrollBar: 23,
        seaGreen: 147,
        seaShell: 148,
        sienna: 149,
        silver: 150,
        skyBlue: 151,
        slateBlue: 152,
        slateGray: 153,
        snow: 154,
        springGreen: 155,
        steelBlue: 156,
        tan: 157,
        teal: 158,
        thistle: 159,
        tomato: 160,
        transparent: 27,
        turquoise: 161,
        violet: 162,
        wheat: 163,
        white: 164,
        whiteSmoke: 165,
        window: 24,
        windowFrame: 25,
        windowText: 26,
        yellow: 166,
        yellowGreen: 167
    }
    PerfectWidgets.Framework.Drawing.KnownColor.registerEnum('PerfectWidgets.Framework.Drawing.KnownColor', false);
    PerfectWidgets.Framework.Drawing.LineStyle = function() {};
    PerfectWidgets.Framework.Drawing.LineStyle.prototype = {
        none: 0,
        solid: 1,
        dot: 2,
        dash: 3,
        dashDot: 4,
        dashDotDot: 5
    }
    PerfectWidgets.Framework.Drawing.LineStyle.registerEnum('PerfectWidgets.Framework.Drawing.LineStyle', false);
    PerfectWidgets.Framework.Drawing.ConicalFill = function() {
        PerfectWidgets.Framework.Drawing.ConicalFill.initializeBase(this);
    }
    PerfectWidgets.Framework.Drawing.Stroke = function() {}
    PerfectWidgets.Framework.Drawing.Stroke.prototype = {
        $0: 0,
        $1: null,
        $2: 0,
        $3: 0,
        $4: 0,
        $5: 0,
        getStyle: function() {
            return this.$0;
        },
        setStyle: function(style) {
            this.$0 = style;
        },
        getColor: function() {
            return this.$1;
        },
        setColor: function(color) {
            this.$1 = color;
        },
        getDashLength: function() {
            return this.$2;
        },
        setDashLength: function(dashLength) {
            this.$2 = dashLength;
        },
        getDotLength: function() {
            return this.$3;
        },
        setDotLength: function(dotLength) {
            this.$3 = dotLength;
        },
        getSpaceLenght: function() {
            return this.$4;
        },
        setSpaceLength: function(spaceLength) {
            this.$4 = spaceLength;
        },
        getWidth: function() {
            return this.$5;
        },
        setWidth: function(width) {
            this.$5 = width;
        }
    }
    PerfectWidgets.Framework.Drawing.Colorizer = function() {}
    PerfectWidgets.Framework.Drawing.ColorSection = function() {}
    PerfectWidgets.Framework.Drawing.ColorSection.prototype = {
        $0: null,
        $1: 0,
        getColor: function() {
            return this.$0;
        },
        setColor: function(ColorValue) {
            this.$0 = ColorValue;
        },
        getPortion: function() {
            return this.$1;
        },
        setPortion: function(PortionValue) {
            this.$1 = PortionValue;
        }
    }
    PerfectWidgets.Framework.Drawing.EllipticArcParameters = function() {}
    PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillParameters = function(rect, startAngle, sweepAngle) {
        var $0 = PerfectWidgets.Framework.Drawing.Unit.rectToPixel(rect);
        var $1 = new PerfectWidgets.Framework.Drawing.EllipticArcParameters();
        var $2 = $0.getCenter();
        var $3 = new PerfectWidgets.Framework.DataObjects.Vector($0.width / 2, $0.height / 2);
        $1.setRx($3.x);
        $1.setRy($3.y);
        $1.setRotationAngle(0);
        $1.setFinishPoint(PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint($2, $3, startAngle + sweepAngle));
        $1.setLargeArcFlag((Math.abs(sweepAngle) % 360 > 180) ? 1 : 0);
        $1.setSweepFlag((sweepAngle > 0) ? 1 : 0);
        return $1;
    }
    PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillLowLevelParameters = function(rx, ry, endPoint, startAngle, sweepAngle, transformation) {
        var $0 = new PerfectWidgets.Framework.Drawing.EllipticArcParameters();
        $0.setRx(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(rx));
        $0.setRy(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(ry));
        var $1 = Type.safeCast(transformation, PerfectWidgets.Framework.Transformation.RotateTransformation);
        if ($1 != null) {
            $0.setRotationAngle($1.getAngle());
        } else {
            $0.setRotationAngle(0);
        }
        $0.setFinishPoint(PerfectWidgets.Framework.Drawing.Unit.vectorToPixel(endPoint));
        $0.setLargeArcFlag((Math.abs(sweepAngle) % 360 > 180) ? 1 : 0);
        $0.setSweepFlag((sweepAngle > 0) ? 1 : 0);
        return $0;
    }
    PerfectWidgets.Framework.Drawing.EllipticArcParameters.prototype = {
        $0: 0,
        getRx: function() {
            return this.$0;
        },
        setRx: function(rxValue) {
            this.$0 = rxValue;
        },
        $1: 0,
        getRy: function() {
            return this.$1;
        },
        setRy: function(ryValue) {
            this.$1 = ryValue;
        },
        $2: 0,
        getRotationAngle: function() {
            return this.$2;
        },
        setRotationAngle: function(rotationAngleValue) {
            this.$2 = rotationAngleValue;
        },
        $3: 0,
        getLargeArcFlag: function() {
            return this.$3;
        },
        setLargeArcFlag: function(largeArcFlagValue) {
            this.$3 = largeArcFlagValue;
        },
        $4: 0,
        getSweepFlag: function() {
            return this.$4;
        },
        setSweepFlag: function(sweepFlagValue) {
            this.$4 = sweepFlagValue;
        },
        $5: null,
        getFinishPoint: function() {
            return this.$5;
        },
        setFinishPoint: function(finishPointValue) {
            this.$5 = finishPointValue;
        },
        toString: function() {
            return String.format('{0} {1} {2} {3} {4} {5} {6}', this.$0, this.$1, this.$2, this.$3, this.$4, this.$5.x, this.$5.y);
        }
    }
    PerfectWidgets.Framework.Drawing.FontFamily = function() {}
    PerfectWidgets.Framework.Drawing.FontFamily.prototype = {
        name: null
    }
    PerfectWidgets.Framework.Drawing.GradientColor = function(color, portion) {
        this.$0 = PerfectWidgets.Framework.Drawing.Color.white;
        if (color != null) {
            this.$0 = color;
        }
        if (portion != null) {
            this.$1 = portion;
        }
    }
    PerfectWidgets.Framework.Drawing.GradientColor.prototype = {
        setColor: function(color) {
            this.$0 = color;
        },
        getColor: function() {
            return this.$0;
        },
        $1: 1,
        setPortion: function(portion) {
            this.$1 = portion;
        },
        getPortion: function() {
            return this.$1;
        }
    }
    PerfectWidgets.Framework.Drawing.GradientColorCollection = function() {
        this.$0 = [];
    }
    PerfectWidgets.Framework.Drawing.GradientColorCollection.prototype = {
        add: function(gradientColor) {
            this.$0.add(gradientColor);
        },
        set: function(index, color) {
            this.$0[index] = color;
        },
        get: function(index) {
            return this.$0[index];
        },
        getCount: function() {
            return this.$0.length;
        }
    }
    PerfectWidgets.Framework.Drawing.GraphicsPathElement = function(elementType) {
        this.$0 = elementType;
    }
    PerfectWidgets.Framework.Drawing.GraphicsPathElement.prototype = {
        $0: 0,
        getElementType: function() {
            return this.$0;
        },
        setElementType: function(elementTypeValue) {
            this.$0 = elementTypeValue;
        },
        toString: function() {
            switch (this.getElementType()) {
                case 2:
                    return 'Z';
                case 5:
                    return 'A';
                case 3:
                    return 'H';
                case 1:
                    return 'L';
                case 0:
                    return 'M';
                case 4:
                    return 'V';
                default:
                    throw new Error('Graphics path element type is unknown');
            }
        }
    }
    PerfectWidgets.Framework.Drawing.GraphicsUtilites = function() {}
    PerfectWidgets.Framework.Drawing.GraphicsUtilites.middleColor = function(color1, color2) {
        var $0 = (color1.r() + color2.r()) / 2;
        var $1 = (color1.g() + color2.g()) / 2;
        var $2 = (color1.b() + color2.b()) / 2;
        var $3 = (color1.a() + color2.a()) / 2;
        if ($0 > 255) {
            $0 = 255;
        }
        if ($1 > 255) {
            $1 = 255;
        }
        if ($2 > 255) {
            $2 = 255;
        }
        return PerfectWidgets.Framework.Drawing.Color.fromArgb($3, $0, $1, $2);
    }
    PerfectWidgets.Framework.Drawing.GraphicsUtilites.scaleColor = function(sourceColor, scale) {
        var $0 = (sourceColor.r() * scale);
        var $1 = (sourceColor.g() * scale);
        var $2 = (sourceColor.b() * scale);
        if ($0 > 255) {
            $0 = 255;
        }
        if ($1 > 255) {
            $1 = 255;
        }
        if ($2 > 255) {
            $2 = 255;
        }
        return PerfectWidgets.Framework.Drawing.Color.fromArgb(255, $0, $1, $2);
    }
    PerfectWidgets.Framework.Drawing.HatchFill = function() {
        this.$1 = PerfectWidgets.Framework.Drawing.Color.white;
        this.$2 = PerfectWidgets.Framework.Drawing.Color.black;
        this.$3 = 3;
        PerfectWidgets.Framework.Drawing.HatchFill.initializeBase(this);
    }
    PerfectWidgets.Framework.Drawing.HatchFill.prototype = {
        getBackColor: function() {
            return this.$1;
        },
        setBackColor: function(backColorValue) {
            this.$1 = backColorValue;
        },
        getForeColor: function() {
            return this.$2;
        },
        setForeColor: function(foreColorValue) {
            this.$2 = foreColorValue;
        },
        createBrush: function(rect) {
            var $0 = new PerfectWidgets.Framework.Drawing.SolidBrush(this.$2);
            return $0;
        },
        getReplaceColor: function() {
            return PerfectWidgets.Framework.Drawing.GraphicsUtilites.middleColor(this.$1, this.$2);
        }
    }
    PerfectWidgets.Framework.Drawing._LinearGradientBrush = function() {}
    PerfectWidgets.Framework.Drawing.MultiGradientFill = function() {
        this.$2 = new PerfectWidgets.Framework.Drawing.GradientColorCollection();
        PerfectWidgets.Framework.Drawing.MultiGradientFill.initializeBase(this);
    }
    PerfectWidgets.Framework.Drawing.MultiGradientFill.prototype = {
        $1: 0,
        getColors: function() {
            return this.$2;
        },
        setColors: function(colors) {
            this.$2 = this.$3(colors);
        },
        $3: function($p0) {
            var $0 = $p0;
            var $1 = false;
            while (!$1) {
                $1 = true;
                for (var $2 = 0; $2 < $0.getCount() - 1; $2++) {
                    if ($0.get($2).getPortion() > $0.get($2 + 1).getPortion()) {
                        var $3 = $0.get($2 + 1);
                        $0.set($2 + 1, $0.get($2));
                        $0.set($2, $3);
                        $1 = false;
                    }
                }
            }
            return $0;
        },
        getAngle: function() {
            return this.$1;
        },
        setAngle: function(angle) {
            this.$1 = angle;
        },
        getMinPortion: function() {
            return this.$2.get(0).getPortion();
        },
        getMaxPortion: function() {
            var $0 = this.$2.getCount() - 1;
            return this.$2.get($0).getPortion();
        },
        createBrush: function(vr) {
            throw new Error('not implemented');
        },
        getReplaceColor: function() {
            var $0 = 0;
            var $1 = 0;
            var $2 = 0;
            var $3 = 0;
            for (var $4 = 0; $4 < this.$2.getCount(); $4++) {
                var $5 = this.$2.get($4);
                $0 += $5.getColor().a();
                $1 += $5.getColor().r();
                $2 += $5.getColor().g();
                $3 += $5.getColor().b();
            }
            if (!!this.$2.getCount()) {
                $0 = $0 / this.$2.getCount();
                $1 = $1 / this.$2.getCount();
                $2 = $2 / this.$2.getCount();
                $3 = $3 / this.$2.getCount();
                return PerfectWidgets.Framework.Drawing.Color.fromArgb(parseInt($0), parseInt($1), parseInt($2), parseInt($3));
            }
            return PerfectWidgets.Framework.Drawing.Color.gray;
        }
    }
    PerfectWidgets.Framework.Drawing.PathElementCollection = function(elementType) {
        PerfectWidgets.Framework.Drawing.PathElementCollection.initializeBase(this, [elementType]);
        this.$1 = [];
    }
    PerfectWidgets.Framework.Drawing.PathElementCollection.prototype = {
        $1: null,
        add: function(elem) {
            this.$1.add(elem);
        },
        addRange: function(elements) {
            this.$1.addRange(elements);
        },
        get_count: function() {
            return this.$1.length;
        },
        toString: function() {
            var $0 = new ss.StringBuilder();
            $0.append(PerfectWidgets.Framework.Drawing.PathElementCollection.callBaseMethod(this, 'toString'));
            for (var $1 = 0; $1 < this.$1.length; $1++) {
                $0.append(' ' + this.$1[$1].toString());
            }
            return $0.toString();
        },
        get_item: function(index) {
            return this.$1[index];
        }
    }
    PerfectWidgets.Framework.Drawing.SectionsColorizer = function() {
        this.$0 = [];
        PerfectWidgets.Framework.Drawing.SectionsColorizer.initializeBase(this);
    }
    PerfectWidgets.Framework.Drawing.SectionsColorizer.prototype = {
        getColorSections: function() {
            return this.$0;
        },
        setColorSections: function(sections) {
            this.$0 = this.$1(sections);
        },
        getColor: function(portion) {
            var $0 = 0;
            while (this.$0.length > $0 && this.$0[$0].getPortion() < portion) {
                $0++;
            }
            if (this.$0.length > $0) {
                return this.$0[$0].getColor();
            }
            return PerfectWidgets.Framework.Drawing.Color.white;
        },
        $1: function($p0) {
            var $0 = $p0.clone();
            var $1 = false;
            while (!$1) {
                $1 = true;
                for (var $2 = 0; $2 < $0.length - 1; $2++) {
                    if ($0[$2].getPortion() > $0[$2 + 1].getPortion()) {
                        var $3 = $0[$2 + 1];
                        $0[$2 + 1] = $0[$2];
                        $0[$2] = $3;
                        $1 = false;
                    }
                }
            }
            return $0;
        }
    }
    PerfectWidgets.Framework.Drawing.SingleColorColorizer = function() {
        this.$0 = PerfectWidgets.Framework.Drawing.Color.black;
        PerfectWidgets.Framework.Drawing.SingleColorColorizer.initializeBase(this);
    }
    PerfectWidgets.Framework.Drawing.SingleColorColorizer.prototype = {
        getColor: function() {
            return this.$0;
        },
        setColor: function(color) {
            this.$0 = color;
        },
        getColor: function(portion) {
            return this.$0;
        }
    }
    PerfectWidgets.Framework.Drawing.SolidBrush = function(Color) {
        PerfectWidgets.Framework.Drawing.SolidBrush.initializeBase(this);
        this.color = Color;
    }
    PerfectWidgets.Framework.Drawing.SolidBrush.prototype = {
        color: null
    }
    PerfectWidgets.Framework.Drawing.SphericalFill = function() {
        PerfectWidgets.Framework.Drawing.SphericalFill.initializeBase(this);
    }
    PerfectWidgets.Framework.Drawing.SphericalFill.prototype = {
        $1: null,
        $2: null,
        $3: 0,
        $4: 0,
        setEndColor: function(color) {
            this.$2 = color;
        },
        getEndColor: function() {
            return this.$2;
        },
        getStartColor: function() {
            return this.$1;
        },
        setStartColor: function(color) {
            this.$1 = color;
        },
        setAngle: function(angle) {
            this.$3 = angle;
        },
        getAngle: function() {
            return this.$3;
        },
        setDelta: function(delta) {
            this.$4 = delta;
        },
        getDelta: function() {
            return this.$4;
        },
        getColors: function() {
            var $0 = new PerfectWidgets.Framework.Drawing.GradientColorCollection();
            var $1 = new PerfectWidgets.Framework.Drawing.GradientColor(this.$2, 0);
            var $2 = new PerfectWidgets.Framework.Drawing.GradientColor(this.$1, 1);
            $0.add($1);
            $0.add($2);
            return $0;
        },
        setColors: function(colors) {},
        createBrush: function(rect) {
            throw new Error('not implemented');
        },
        getReplaceColor: function() {
            return PerfectWidgets.Framework.Drawing.GraphicsUtilites.middleColor(this.$1, this.$2);
        }
    }
    PerfectWidgets.Framework.Drawing.Brush = function() {}
    PerfectWidgets.Framework.Drawing.Color = function(value, state, name, knownColor) {
        this.$5 = value;
        this.$7 = state;
        this.$8 = name;
        this.$6 = knownColor;
    }
    PerfectWidgets.Framework.Drawing.Color.$A = function($p0) {
        return new PerfectWidgets.Framework.Drawing.Color(0, PerfectWidgets.Framework.Drawing.Color.$3, null, $p0);
    }
    PerfectWidgets.Framework.Drawing.Color.$B = function($p0, $p1) {
        if (($p0 < 0) || ($p0 > 255)) {
            throw new Error('InvalidEx2BoundArgument');
        }
    }
    PerfectWidgets.Framework.Drawing.Color.$C = function($p0, $p1, $p2, $p3) {
        return (((((($p1 << 16) | ($p2 << 8)) | $p3) | ($p0 << 24))) & 4294967295);
    }
    PerfectWidgets.Framework.Drawing.Color.fromArgb = function(alpha, red, green, blue) {
        PerfectWidgets.Framework.Drawing.Color.$B(alpha, 'alpha');
        PerfectWidgets.Framework.Drawing.Color.$B(red, 'red');
        PerfectWidgets.Framework.Drawing.Color.$B(green, 'green');
        PerfectWidgets.Framework.Drawing.Color.$B(blue, 'blue');
        return new PerfectWidgets.Framework.Drawing.Color(PerfectWidgets.Framework.Drawing.Color.$C(alpha, red, green, blue), PerfectWidgets.Framework.Drawing.Color.$4, null, 0);
    }
    PerfectWidgets.Framework.Drawing.Color.prototype = {
        $5: 0,
        $6: 0,
        $7: 0,
        $8: null,
        r: function() {
            return ((this.$9() >> 16) & 255);
        },
        g: function() {
            return ((this.$9() >> 8) & 255);
        },
        b: function() {
            return (this.$9() & 255);
        },
        a: function() {
            return ((this.$9() >> 24) & 255);
        },
        $9: function() {
            if (!!(this.$7 & PerfectWidgets.Framework.Drawing.Color.$2)) {
                return this.$5;
            }
            if (this.isKnownColor()) {
                return PerfectWidgets.Framework.Drawing.KnownColorTable.knownColorToArgb(this.$6);
            }
            return PerfectWidgets.Framework.Drawing.Color.$1;
        },
        toArgb: function() {
            return this.$9();
        },
        isEmpty: function() {
            return !this.$7;
        },
        isSystemColor: function() {
            if (!this.isKnownColor()) {
                return false;
            }
            if (this.$6 > 26) {
                return (this.$6 > 167);
            }
            return true;
        },
        isKnownColor: function() {
            return (!!(this.$7 & PerfectWidgets.Framework.Drawing.Color.$3));
        },
        isNamedColor: function() {
            if (!(this.$7 & PerfectWidgets.Framework.Drawing.Color.$0)) {
                return this.isKnownColor();
            }
            return true;
        },
        toKnownColor: function() {
            return this.$6;
        },
        toString: function() {
            var $0 = new ss.StringBuilder();
            $0.append(this.$5.toString());
            $0.append(';');
            $0.append(this.$7.toString());
            $0.append(';');
            $0.append(this.$8);
            $0.append(';');
            $0.append(this.$6.toString());
            return $0.toString();
        },
        name: function() {
            if (!!(this.$7 & PerfectWidgets.Framework.Drawing.Color.$0)) {
                return this.$8;
            }
            if (!this.isKnownColor()) {
                return this.$5.toString(10);
            }
            var $0 = PerfectWidgets.Framework.Drawing.KnownColorTable.knownColorToName(this.$6);
            if ($0 != null) {
                return $0;
            }
            return (this.$6).toString();
        }
    }
    PerfectWidgets.Framework.Drawing.ColorTranslator = function() {}
    PerfectWidgets.Framework.Drawing.ColorTranslator.$0 = function($p0, $p1, $p2) {
        return '#' + $p0.toString(16) + $p1.toString(16) + $p2.toString(16);
    }
    PerfectWidgets.Framework.Drawing.ColorTranslator.toHtml = function(c) {
        var $0 = '';
        if (!c.isEmpty()) {
            if (!c.isSystemColor()) {
                if (c.isNamedColor()) {
                    if (c === PerfectWidgets.Framework.Drawing.Color.lightGray) {
                        return 'LightGrey';
                    }
                    return c.name();
                }
                return ('#' + c.r().toString(16) + c.g().toString(16) + c.b().toString(16));
            }
            switch (c.toKnownColor()) {
                case 1:
                    return 'activeborder';
                case 2:
                case 171:
                    return 'activecaption';
                case 3:
                    return 'captiontext';
                case 4:
                    return 'appworkspace';
                case 5:
                    return 'buttonface';
                case 6:
                    return 'buttonshadow';
                case 7:
                    return 'threeddarkshadow';
                case 8:
                    return 'buttonface';
                case 9:
                    return 'buttonhighlight';
                case 10:
                    return 'buttontext';
                case 11:
                    return 'background';
                case 12:
                    return 'graytext';
                case 13:
                case 15:
                    return 'highlight';
                case 14:
                case 174:
                    return 'highlighttext';
                case 16:
                    return 'inactiveborder';
                case 17:
                case 172:
                    return 'inactivecaption';
                case 18:
                    return 'inactivecaptiontext';
                case 19:
                    return 'infobackground';
                case 20:
                    return 'infotext';
                case 21:
                case 173:
                    return 'menu';
                case 22:
                    return 'menutext';
                case 23:
                    return 'scrollbar';
                case 24:
                    return 'window';
                case 25:
                    return 'windowframe';
                case 26:
                    return 'windowtext';
            }
        }
        return $0;
    }
    PerfectWidgets.Framework.Drawing.ColorTranslator.$1 = function($p0, $p1, $p2) {
        return ('rgb(' + $p0 + ',' + $p1 + ',' + $p2 + ')');
    }
    PerfectWidgets.Framework.Drawing.ColorTranslator.toSvg = function(c) {
        var $0 = '';
        if (!c.isEmpty()) {
            if (!c.isSystemColor()) {
                if (c.isNamedColor()) {
                    if (c === PerfectWidgets.Framework.Drawing.Color.lightGray) {
                        return 'LightGrey';
                    } else if (c.name() === 'Transparent') {
                        return 'rgb(255, 255, 255)';
                    }
                    return c.name();
                }
                return ('rgb(' + c.r() + ',' + c.g() + ',' + c.b() + ')');
            }
            switch (c.toKnownColor()) {
                case 1:
                    return 'activeborder';
                case 2:
                case 171:
                    return 'activecaption';
                case 3:
                    return 'captiontext';
                case 4:
                    return 'appworkspace';
                case 5:
                    return 'buttonface';
                case 6:
                    return 'buttonshadow';
                case 7:
                    return 'threeddarkshadow';
                case 8:
                    return 'buttonface';
                case 9:
                    return 'buttonhighlight';
                case 10:
                    return 'buttontext';
                case 11:
                    return 'background';
                case 12:
                    return 'graytext';
                case 13:
                case 15:
                    return 'highlight';
                case 14:
                case 174:
                    return 'highlighttext';
                case 16:
                    return 'inactiveborder';
                case 17:
                case 172:
                    return 'inactivecaption';
                case 18:
                    return 'inactivecaptiontext';
                case 19:
                    return 'infobackground';
                case 20:
                    return 'infotext';
                case 21:
                case 173:
                    return 'menu';
                case 22:
                    return 'menutext';
                case 23:
                    return 'scrollbar';
                case 24:
                    return 'window';
                case 25:
                    return 'windowframe';
                case 26:
                    return 'windowtext';
            }
        }
        return $0;
    }
    PerfectWidgets.Framework.Drawing.EmptyFill = function() {
        PerfectWidgets.Framework.Drawing.EmptyFill.initializeBase(this);
    }
    PerfectWidgets.Framework.Drawing.EmptyFill.prototype = {
        createBrush: function(vr) {
            return null;
        },
        getReplaceColor: function() {
            return PerfectWidgets.Framework.Drawing.Color.empty;
        }
    }
    PerfectWidgets.Framework.Drawing.Fill = function() {}
    PerfectWidgets.Framework.Drawing.Fill.getCenterPoint = function(rect, delta, angle) {
        var $0 = rect.getSize().getLength();
        var $1 = $0 / 2 * delta;
        var $2 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar($1, PerfectWidgets.Framework.DataObjects.Vector.toRadians(angle));
        var $3 = rect.getCenter().add($2);
        return $3;
    }
    PerfectWidgets.Framework.Drawing.Fill.getFillRectangle = function(rect, delta, angle) {
        var $0 = PerfectWidgets.Framework.Drawing.Fill.getCenterPoint(rect, delta, angle);
        var $1 = rect.getTopLeft().minus($0).getLength();
        var $2 = rect.getTopRight().minus($0).getLength();
        var $3 = rect.getBottomRight().minus($0).getLength();
        var $4 = rect.getBottomLeft().minus($0).getLength();
        var $5 = Math.max(Math.max($1, $2), Math.max($3, $4));
        var $6 = new PerfectWidgets.Framework.DataObjects.Vector($5 * 2, $5 * 2);
        var $7 = $0.minus($6.divideByNumber(2));
        var $8 = $6;
        return new PerfectWidgets.Framework.DataObjects.VectorRectangle($7.x, $7.y, $8.x, $8.y);
    }
    PerfectWidgets.Framework.Drawing.Fill.prototype = {
        $0: 0,
        getAdditionalAngle: function() {
            return this.$0;
        },
        setAdditionalAngle: function(additionalAngle) {
            this.$0 = additionalAngle;
        }
    }
    PerfectWidgets.Framework.Drawing.GraphicsPath = function() {
        this.$0 = PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
        this.$1 = [];
    }
    PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector = function(line) {
        return PerfectWidgets.Framework.Drawing.Unit.vectorToPixel(line);
    }
    PerfectWidgets.Framework.Drawing.GraphicsPath.prototype = {
        addGraphicsPath: function(appendedPath) {
            var $enum1 = ss.IEnumerator.getEnumerator(appendedPath.get_pathElements());
            while ($enum1.moveNext()) {
                var $0 = $enum1.current;
                this.$1.add($0);
            }
        },
        addPathElement: function(graphicsPathElement) {
            this.get_pathElements().add(graphicsPathElement);
        },
        get_count: function() {
            return this.$1.length;
        },
        $1: null,
        get_pathElements: function() {
            return this.$1;
        },
        set_pathElements: function(value) {
            this.$1 = value;
            return value;
        },
        setBounds: function(boundedBox) {
            this.$0 = boundedBox;
        },
        getBounds: function() {
            return this.$0;
        },
        addArc: function(rect, startAngle, sweepAngle) {
            var $0 = new PerfectWidgets.Framework.Drawing.PathElementCollection(5);
            $0.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillParameters(rect, startAngle, sweepAngle));
            this.addPathElement($0);
        },
        addLine: function(endPoint) {
            var $0 = new PerfectWidgets.Framework.Drawing.PathElementCollection(1);
            $0.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(endPoint));
            this.addPathElement($0);
        },
        moveTo: function(target) {
            var $0 = new PerfectWidgets.Framework.Drawing.PathElementCollection(0);
            $0.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(target));
            this.addPathElement($0);
        },
        startPath: function(origin) {
            var $0 = new PerfectWidgets.Framework.Drawing.PathElementCollection(0);
            $0.add(PerfectWidgets.Framework.Drawing.Unit.vectorToPixel(origin));
            this.addPathElement($0);
        },
        terminate: function() {
            var $0 = new PerfectWidgets.Framework.Drawing.PathElementCollection(2);
            this.addPathElement($0);
        },
        toString: function() {
            if (this.$1.length > 0) {
                this.addPathElement(this.$1[0]);
            }
            var $0 = new ss.StringBuilder();
            for (var $1 = 0; $1 < this.$1.length; $1++) {
                var $2 = this.$1[$1];
                $0.append(' ' + $2.toString());
            }
            return $0.toString();
        }
    }
    PerfectWidgets.Framework.Drawing.Image = function(stream) {
        this.$0 = stream;
    }
    PerfectWidgets.Framework.Drawing.Image.prototype = {
        $0: null,
        getImageStream: function() {
            return this.$0;
        }
    }
    PerfectWidgets.Framework.Drawing.KnownColorTable = function() {}
    PerfectWidgets.Framework.Drawing.KnownColorTable.$2 = function() {
        if (PerfectWidgets.Framework.Drawing.KnownColorTable.$0 == null) {
            PerfectWidgets.Framework.Drawing.KnownColorTable.$3();
        }
    }
    PerfectWidgets.Framework.Drawing.KnownColorTable.$3 = function() {
        var $0 = new Array(175);
        $0[27] = 16777215;
        $0[28] = -984833;
        $0[29] = -332841;
        $0[30] = -16711681;
        $0[31] = -8388652;
        $0[32] = -983041;
        $0[33] = -657956;
        $0[34] = -6972;
        $0[35] = -16777216;
        $0[36] = -5171;
        $0[37] = -16776961;
        $0[38] = -7722014;
        $0[39] = -5952982;
        $0[40] = -2180985;
        $0[41] = -10510688;
        $0[42] = -8388864;
        $0[43] = -2987746;
        $0[44] = -32944;
        $0[45] = -10185235;
        $0[46] = -1828;
        $0[47] = -2354116;
        $0[48] = -16711681;
        $0[49] = -16777077;
        $0[50] = -16741493;
        $0[51] = -4684277;
        $0[52] = -5658199;
        $0[53] = -16751616;
        $0[54] = -4343957;
        $0[55] = -7667573;
        $0[56] = -11179217;
        $0[57] = -29696;
        $0[58] = -6737204;
        $0[59] = -7667712;
        $0[60] = -1468806;
        $0[61] = -7357301;
        $0[62] = -12042869;
        $0[63] = -13676721;
        $0[64] = -16724271;
        $0[65] = -7077677;
        $0[66] = -60269;
        $0[67] = -16728065;
        $0[68] = -9868951;
        $0[69] = -14774017;
        $0[70] = -5103070;
        $0[71] = -1296;
        $0[72] = -14513374;
        $0[73] = -65281;
        $0[74] = -2302756;
        $0[75] = -460545;
        $0[76] = -10496;
        $0[77] = -2448096;
        $0[78] = -8355712;
        $0[79] = -16744448;
        $0[80] = -5374161;
        $0[81] = -983056;
        $0[82] = -38476;
        $0[83] = -3318692;
        $0[84] = -11861886;
        $0[85] = -16;
        $0[86] = -989556;
        $0[87] = -1644806;
        $0[88] = -3851;
        $0[89] = -8586240;
        $0[90] = -1331;
        $0[91] = -5383962;
        $0[92] = -1015680;
        $0[93] = -2031617;
        $0[94] = -329006;
        $0[95] = -2894893;
        $0[96] = -7278960;
        $0[97] = -18751;
        $0[98] = -24454;
        $0[99] = -14634326;
        $0[100] = -7876870;
        $0[101] = -8943463;
        $0[102] = -5192482;
        $0[103] = -32;
        $0[104] = -16711936;
        $0[105] = -13447886;
        $0[106] = -331546;
        $0[107] = -65281;
        $0[108] = -8388608;
        $0[109] = -10039894;
        $0[110] = -16777011;
        $0[111] = -4565549;
        $0[112] = -7114533;
        $0[113] = -12799119;
        $0[114] = -8689426;
        $0[115] = -16713062;
        $0[116] = -12004916;
        $0[117] = -3730043;
        $0[118] = -15132304;
        $0[119] = -655366;
        $0[120] = -6943;
        $0[121] = -6987;
        $0[122] = -8531;
        $0[123] = -16777088;
        $0[124] = -133658;
        $0[125] = -8355840;
        $0[126] = -9728477;
        $0[127] = -23296;
        $0[128] = -47872;
        $0[129] = -2461482;
        $0[130] = -1120086;
        $0[131] = -6751336;
        $0[132] = -5247250;
        $0[133] = -2396013;
        $0[134] = -4139;
        $0[135] = -9543;
        $0[136] = -3308225;
        $0[137] = -16181;
        $0[138] = -2252579;
        $0[139] = -5185306;
        $0[140] = -8388480;
        $0[141] = -65536;
        $0[142] = -4419697;
        $0[143] = -12490271;
        $0[144] = -7650029;
        $0[145] = -360334;
        $0[146] = -744352;
        $0[147] = -13726889;
        $0[148] = -2578;
        $0[149] = -6270419;
        $0[150] = -4144960;
        $0[151] = -7876885;
        $0[152] = -9807155;
        $0[153] = -9404272;
        $0[154] = -1286;
        $0[155] = -16711809;
        $0[156] = -12156236;
        $0[157] = -2968436;
        $0[158] = -16744320;
        $0[159] = -2572328;
        $0[160] = -40121;
        $0[161] = -12525360;
        $0[162] = -1146130;
        $0[163] = -663885;
        $0[164] = -1;
        $0[165] = -657931;
        $0[166] = -256;
        $0[167] = -6632142;
        PerfectWidgets.Framework.Drawing.KnownColorTable.$0 = $0;
    }
    PerfectWidgets.Framework.Drawing.KnownColorTable.$4 = function() {
        if (PerfectWidgets.Framework.Drawing.KnownColorTable.$1 == null) {
            PerfectWidgets.Framework.Drawing.KnownColorTable.$5();
        }
    }
    PerfectWidgets.Framework.Drawing.KnownColorTable.$5 = function() {
        var $0 = new Array(175);
        $0[1] = 'ActiveBorder';
        $0[2] = 'ActiveCaption';
        $0[3] = 'ActiveCaptionText';
        $0[4] = 'AppWorkspace';
        $0[168] = 'ButtonFace';
        $0[169] = 'ButtonHighlight';
        $0[170] = 'ButtonShadow';
        $0[5] = 'Control';
        $0[6] = 'ControlDark';
        $0[7] = 'ControlDarkDark';
        $0[8] = 'ControlLight';
        $0[9] = 'ControlLightLight';
        $0[10] = 'ControlText';
        $0[11] = 'Desktop';
        $0[171] = 'GradientActiveCaption';
        $0[172] = 'GradientInactiveCaption';
        $0[12] = 'GrayText';
        $0[13] = 'Highlight';
        $0[14] = 'HighlightText';
        $0[15] = 'HotTrack';
        $0[16] = 'InactiveBorder';
        $0[17] = 'InactiveCaption';
        $0[18] = 'InactiveCaptionText';
        $0[19] = 'Info';
        $0[20] = 'InfoText';
        $0[21] = 'Menu';
        $0[173] = 'MenuBar';
        $0[174] = 'MenuHighlight';
        $0[22] = 'MenuText';
        $0[23] = 'ScrollBar';
        $0[24] = 'Window';
        $0[25] = 'WindowFrame';
        $0[26] = 'WindowText';
        $0[27] = 'Transparent';
        $0[28] = 'AliceBlue';
        $0[29] = 'AntiqueWhite';
        $0[30] = 'Aqua';
        $0[31] = 'Aquamarine';
        $0[32] = 'Azure';
        $0[33] = 'Beige';
        $0[34] = 'Bisque';
        $0[35] = 'Black';
        $0[36] = 'BlanchedAlmond';
        $0[37] = 'Blue';
        $0[38] = 'BlueViolet';
        $0[39] = 'Brown';
        $0[40] = 'BurlyWood';
        $0[41] = 'CadetBlue';
        $0[42] = 'Chartreuse';
        $0[43] = 'Chocolate';
        $0[44] = 'Coral';
        $0[45] = 'CornflowerBlue';
        $0[46] = 'Cornsilk';
        $0[47] = 'Crimson';
        $0[48] = 'Cyan';
        $0[49] = 'DarkBlue';
        $0[50] = 'DarkCyan';
        $0[51] = 'DarkGoldenrod';
        $0[52] = 'DarkGray';
        $0[53] = 'DarkGreen';
        $0[54] = 'DarkKhaki';
        $0[55] = 'DarkMagenta';
        $0[56] = 'DarkOliveGreen';
        $0[57] = 'DarkOrange';
        $0[58] = 'DarkOrchid';
        $0[59] = 'DarkRed';
        $0[60] = 'DarkSalmon';
        $0[61] = 'DarkSeaGreen';
        $0[62] = 'DarkSlateBlue';
        $0[63] = 'DarkSlateGray';
        $0[64] = 'DarkTurquoise';
        $0[65] = 'DarkViolet';
        $0[66] = 'DeepPink';
        $0[67] = 'DeepSkyBlue';
        $0[68] = 'DimGray';
        $0[69] = 'DodgerBlue';
        $0[70] = 'Firebrick';
        $0[71] = 'FloralWhite';
        $0[72] = 'ForestGreen';
        $0[73] = 'Fuchsia';
        $0[74] = 'Gainsboro';
        $0[75] = 'GhostWhite';
        $0[76] = 'Gold';
        $0[77] = 'Goldenrod';
        $0[78] = 'Gray';
        $0[79] = 'Green';
        $0[80] = 'GreenYellow';
        $0[81] = 'Honeydew';
        $0[82] = 'HotPink';
        $0[83] = 'IndianRed';
        $0[84] = 'Indigo';
        $0[85] = 'Ivory';
        $0[86] = 'Khaki';
        $0[87] = 'Lavender';
        $0[88] = 'LavenderBlush';
        $0[89] = 'LawnGreen';
        $0[90] = 'LemonChiffon';
        $0[91] = 'LightBlue';
        $0[92] = 'LightCoral';
        $0[93] = 'LightCyan';
        $0[94] = 'LightGoldenrodYellow';
        $0[95] = 'LightGray';
        $0[96] = 'LightGreen';
        $0[97] = 'LightPink';
        $0[98] = 'LightSalmon';
        $0[99] = 'LightSeaGreen';
        $0[100] = 'LightSkyBlue';
        $0[101] = 'LightSlateGray';
        $0[102] = 'LightSteelBlue';
        $0[103] = 'LightYellow';
        $0[104] = 'Lime';
        $0[105] = 'LimeGreen';
        $0[106] = 'Linen';
        $0[107] = 'Magenta';
        $0[108] = 'Maroon';
        $0[109] = 'MediumAquamarine';
        $0[110] = 'MediumBlue';
        $0[111] = 'MediumOrchid';
        $0[112] = 'MediumPurple';
        $0[113] = 'MediumSeaGreen';
        $0[114] = 'MediumSlateBlue';
        $0[115] = 'MediumSpringGreen';
        $0[116] = 'MediumTurquoise';
        $0[117] = 'MediumVioletRed';
        $0[118] = 'MidnightBlue';
        $0[119] = 'MintCream';
        $0[120] = 'MistyRose';
        $0[121] = 'Moccasin';
        $0[122] = 'NavajoWhite';
        $0[123] = 'Navy';
        $0[124] = 'OldLace';
        $0[125] = 'Olive';
        $0[126] = 'OliveDrab';
        $0[127] = 'Orange';
        $0[128] = 'OrangeRed';
        $0[129] = 'Orchid';
        $0[130] = 'PaleGoldenrod';
        $0[131] = 'PaleGreen';
        $0[132] = 'PaleTurquoise';
        $0[133] = 'PaleVioletRed';
        $0[134] = 'PapayaWhip';
        $0[135] = 'PeachPuff';
        $0[136] = 'Peru';
        $0[137] = 'Pink';
        $0[138] = 'Plum';
        $0[139] = 'PowderBlue';
        $0[140] = 'Purple';
        $0[141] = 'Red';
        $0[142] = 'RosyBrown';
        $0[143] = 'RoyalBlue';
        $0[144] = 'SaddleBrown';
        $0[145] = 'Salmon';
        $0[146] = 'SandyBrown';
        $0[147] = 'SeaGreen';
        $0[148] = 'SeaShell';
        $0[149] = 'Sienna';
        $0[150] = 'Silver';
        $0[151] = 'SkyBlue';
        $0[152] = 'SlateBlue';
        $0[153] = 'SlateGray';
        $0[154] = 'Snow';
        $0[155] = 'SpringGreen';
        $0[156] = 'SteelBlue';
        $0[157] = 'Tan';
        $0[158] = 'Teal';
        $0[159] = 'Thistle';
        $0[160] = 'Tomato';
        $0[161] = 'Turquoise';
        $0[162] = 'Violet';
        $0[163] = 'Wheat';
        $0[164] = 'White';
        $0[165] = 'WhiteSmoke';
        $0[166] = 'Yellow';
        $0[167] = 'YellowGreen';
        PerfectWidgets.Framework.Drawing.KnownColorTable.$1 = $0;
    }
    PerfectWidgets.Framework.Drawing.KnownColorTable.knownColorToArgb = function(color) {
        PerfectWidgets.Framework.Drawing.KnownColorTable.$2();
        if (color <= 174) {
            return PerfectWidgets.Framework.Drawing.KnownColorTable.$0[color];
        }
        return 0;
    }
    PerfectWidgets.Framework.Drawing.KnownColorTable.knownColorToName = function(color) {
        PerfectWidgets.Framework.Drawing.KnownColorTable.$4();
        if (color <= 174) {
            return PerfectWidgets.Framework.Drawing.KnownColorTable.$1[color];
        }
        return null;
    }
    PerfectWidgets.Framework.Drawing.LinearGradientFill = function() {
        this.$1 = PerfectWidgets.Framework.Drawing.Color.black;
        this.$2 = PerfectWidgets.Framework.Drawing.Color.white;
        PerfectWidgets.Framework.Drawing.LinearGradientFill.initializeBase(this);
    }
    PerfectWidgets.Framework.Drawing.LinearGradientFill.prototype = {
        $3: 0,
        getColors: function() {
            var $0 = new PerfectWidgets.Framework.Drawing.GradientColorCollection();
            $0.add(new PerfectWidgets.Framework.Drawing.GradientColor(this.$2, 0));
            $0.add(new PerfectWidgets.Framework.Drawing.GradientColor(this.$1, 1));
            return $0;
        },
        setColors: function(colors) {},
        getStartColor: function() {
            return this.$1;
        },
        setStartColor: function(color) {
            this.$1 = color;
        },
        getEndColor: function() {
            return this.$2;
        },
        setEndColor: function(color) {
            this.$2 = color;
        },
        getAngle: function() {
            return this.$3;
        },
        setAngle: function(angle) {
            this.$3 = angle;
        },
        createBrush: function(vr) {
            throw new Error('not implemented');
        },
        getReplaceColor: function() {
            return PerfectWidgets.Framework.Drawing.GraphicsUtilites.middleColor(this.$1, this.$2);
        }
    }
    PerfectWidgets.Framework.Drawing.Margins = function(top, bottom, left, right) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    PerfectWidgets.Framework.Drawing.Margins.add = function(a, b) {
        return new PerfectWidgets.Framework.Drawing.Margins(a.top + b.top, a.bottom + b.bottom, a.left + b.left, a.right + b.right);
    }
    PerfectWidgets.Framework.Drawing.Margins.multiply = function(a, b) {
        var $0 = Math.max(a.left, b.left);
        var $1 = Math.max(a.top, b.top);
        var $2 = Math.max(a.right, b.right);
        var $3 = Math.max(a.bottom, b.bottom);
        return new PerfectWidgets.Framework.Drawing.Margins($1, $3, $0, $2);
    }
    PerfectWidgets.Framework.Drawing.Margins.prototype = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        equals: function(obj) {
            var $0 = Type.safeCast(obj, PerfectWidgets.Framework.Drawing.Margins);
            if ($0 != null && this.left === $0.left && this.top === $0.top && this.right === $0.right && this.bottom === $0.bottom) {
                return true;
            }
            return false;
        },
        convertUnits: function(fromUnit, toUnit) {
            var $0 = fromUnit.k / toUnit.k;
            return new PerfectWidgets.Framework.Drawing.Margins(this.top * $0, this.bottom * $0, this.left * $0, this.right * $0);
        },
        isEmpty: function() {
            return (!this.left && !this.top && !this.right && !this.bottom);
        },
        size: function() {
            return new PerfectWidgets.Framework.DataObjects.Vector(this.left + this.right, this.top + this.bottom);
        }
    }
    PerfectWidgets.Framework.Drawing.Pen = function(color, width) {
        this.$0 = color;
        this.$5 = width;
    }
    PerfectWidgets.Framework.Drawing.Pen.prototype = {
        $0: null,
        $1: 0,
        $2: 0,
        $3: 0,
        $4: null,
        $5: 0,
        getColor: function() {
            return this.$0;
        },
        setColor: function(color) {
            this.$0 = color;
        },
        getDashStyle: function() {
            return this.$1;
        },
        setDashStyle: function(dashStyle) {
            this.$1 = dashStyle;
        },
        getDashCap: function() {
            return this.$2;
        },
        setDashCap: function(dashCap) {
            this.$2 = dashCap;
        },
        getDashOffset: function() {
            return this.$3;
        },
        setDashOffset: function(dashOffset) {
            this.$3 = dashOffset;
        },
        getDashPattern: function() {
            return this.$4;
        },
        setDashPattern: function(dashPattern) {
            this.$4 = dashPattern;
        },
        getWidth: function() {
            return this.$5;
        },
        setWidth: function(width) {
            this.$5 = width;
        }
    }
    PerfectWidgets.Framework.Drawing.SolidFill = function(solidColor) {
        this.color = PerfectWidgets.Framework.Drawing.Color.white;
        PerfectWidgets.Framework.Drawing.SolidFill.initializeBase(this);
        if (solidColor != null) {
            this.setColor(solidColor);
        }
    }
    PerfectWidgets.Framework.Drawing.SolidFill.prototype = {
        setColor: function(color) {
            this.color = color;
        },
        createBrush: function(vr) {
            return new PerfectWidgets.Framework.Drawing.SolidBrush(this.color);
        },
        getReplaceColor: function() {
            return this.color;
        }
    }
    PerfectWidgets.Framework.Drawing.Unit = function(name, shortName, k) {
        this.name = name;
        this.shortName = shortName;
        this.k = k;
    }
    PerfectWidgets.Framework.Drawing.Unit.getStandardUnits = function() {
        return [PerfectWidgets.Framework.Drawing.Unit.inch, PerfectWidgets.Framework.Drawing.Unit.millimeter, PerfectWidgets.Framework.Drawing.Unit.centimeter, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.point, PerfectWidgets.Framework.Drawing.Unit.twip];
    }
    PerfectWidgets.Framework.Drawing.Unit.convert = function(value, fromUnit, toUnit) {
        var $0 = fromUnit.k / toUnit.k;
        return value * $0;
    }
    PerfectWidgets.Framework.Drawing.Unit.fromName = function(name) {
        var $enum1 = ss.IEnumerator.getEnumerator(PerfectWidgets.Framework.Drawing.Unit.getStandardUnits());
        while ($enum1.moveNext()) {
            var $0 = $enum1.current;
            if ($0.name === name || $0.shortName === name) {
                return $0;
            }
        }
        return new PerfectWidgets.Framework.Drawing.Unit('', '', 1);
    }
    PerfectWidgets.Framework.Drawing.Unit.toInternalUnit = function(value, fromUnit) {
        return PerfectWidgets.Framework.Drawing.Unit.convert(value, fromUnit, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
    }
    PerfectWidgets.Framework.Drawing.Unit.rectToPixel = function(input) {
        var $0 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(input.x);
        var $1 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(input.y);
        var $2 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(input.width);
        var $3 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(input.height);
        return new PerfectWidgets.Framework.DataObjects.VectorRectangle($0, $1, $2, $3);
    }
    PerfectWidgets.Framework.Drawing.Unit.rectToInternal = function(input) {
        var $0 = PerfectWidgets.Framework.Drawing.Unit.pixelToInternal(input.x);
        var $1 = PerfectWidgets.Framework.Drawing.Unit.pixelToInternal(input.y);
        var $2 = PerfectWidgets.Framework.Drawing.Unit.pixelToInternal(input.width);
        var $3 = PerfectWidgets.Framework.Drawing.Unit.pixelToInternal(input.height);
        return new PerfectWidgets.Framework.DataObjects.VectorRectangle($0, $1, $2, $3);
    }
    PerfectWidgets.Framework.Drawing.Unit.vectorToPixel = function(input) {
        return new PerfectWidgets.Framework.DataObjects.Vector(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(input.x), PerfectWidgets.Framework.Drawing.Unit.internalToPixel(input.y));
    }
    PerfectWidgets.Framework.Drawing.Unit.vectorToInternal = function(input) {
        return new PerfectWidgets.Framework.DataObjects.Vector(PerfectWidgets.Framework.Drawing.Unit.pixelToInternal(input.x), PerfectWidgets.Framework.Drawing.Unit.pixelToInternal(input.y));
    }
    PerfectWidgets.Framework.Drawing.Unit.fromInternalUnit = function(value, toUnit) {
        return PerfectWidgets.Framework.Drawing.Unit.convert(value, PerfectWidgets.Framework.Drawing.Unit.internalUnit, toUnit);
    }
    PerfectWidgets.Framework.Drawing.Unit.internalToPixel = function(value) {
        return PerfectWidgets.Framework.Drawing.Unit.convert(value, PerfectWidgets.Framework.Drawing.Unit.internalUnit, PerfectWidgets.Framework.Drawing.Unit.pixel);
    }
    PerfectWidgets.Framework.Drawing.Unit.pixelToInternal = function(value) {
        return PerfectWidgets.Framework.Drawing.Unit.convert(value, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
    }
    PerfectWidgets.Framework.Drawing.Unit.prototype = {
        name: null,
        shortName: null,
        k: 0,
        equals: function(obj) {
            var $0 = Type.safeCast(obj, PerfectWidgets.Framework.Drawing.Unit);
            if ($0 == null) {
                return false;
            }
            return (this.name === $0.name && this.shortName === $0.shortName && this.k === $0.k);
        }
    }
    Type.registerNamespace('PerfectWidgets.Framework.Utilities');
    PerfectWidgets.Framework.Utilities.BuiltIn = function() {}
    PerfectWidgets.Framework.Utilities.BuiltIn.oldFormat = function(value, format) {
        var $0 = 0;
        var $1 = 0;
        var $2 = true;
        var $3 = '';
        if (format.charAt(0) !== 'F') {
            for (var $7 = 0; $7 < format.length; $7++) {
                if (format.charAt($7) === '0') {
                    if ($2) {
                        $0++;
                    } else {
                        $1++;
                    }
                } else if (format.charAt($7) === '.') {
                    $2 = false;
                }
            }
            $3 = value.format('F' + $1);
        } else {
            $3 = value.format(format);
        }
        var $4 = $0 + $1 + 1;
        var $5 = new ss.StringBuilder('');
        var $6 = '0';
        for (var $8 = $3.length; $8 < $4; $8++) {
            $5.append($6);
        }
        return $5.toString() + $3;
    }
    PerfectWidgets.Framework.Utilities.BuiltIn.JS = function(str) {}
    PerfectWidgets.Framework.Utilities.TextUtilities = function() {}
    PerfectWidgets.Framework.Utilities.TextUtilities.insertMockDiv = function(font) {
        var $0 = document.createElement('div');
        $0.id = '_PerpetuumMeasureStringDiv';
        document.body.appendChild($0);
        $0.style.position = 'absolute';
        $0.style.left = '-1000';
        $0.style.top = '-1000';
        $0.style.display = 'block';
        $0.style.fontFamily = font.fontFamily.name;
        $0.style.fontSize = font.sizeInPoints.toString() + 'pt';
        $0.style.visibility = 'hidden';
        if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, 2)) {
            $0.style.fontStyle = 'italic';
        }
        if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, 1)) {
            $0.style.fontWeight = 'bold';
        }
        if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, 4)) {
            $0.style.textDecoration = 'underline';
        } else {
            if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, 8)) {
                $0.style.textDecoration = 'line-through';
            }
        }
        return $0;
    }
    PerfectWidgets.Framework.Utilities.TextUtilities.deleteMockDiv = function(div) {
        document.body.removeChild(div);
    }
    PerfectWidgets.Framework.Utilities.TextUtilities.$2 = function($p0, $p1) {
        var $0 = ((typeof($p1.split) === 'function')) ? $p1.split('\n') : [$p1];
        var $enum1 = ss.IEnumerator.getEnumerator($0);
        while ($enum1.moveNext()) {
            var $2 = $enum1.current;
            var $3 = document.createElement('text');
            $3.innerHTML = $2;
            $p0.appendChild($3);
        }
        var $1 = new PerfectWidgets.Framework.DataObjects.Vector($p0.offsetWidth, $p0.offsetHeight);
        for (var $4 = 0; $4 < $p0.childNodes.length; $4++) {
            var $5 = $p0.childNodes[$4];
            $p0.removeChild($5);
        }
        return $1;
    }
    PerfectWidgets.Framework.Utilities.TextUtilities.splitText = function(text, lineWidth, font) {
        var $0 = PerfectWidgets.Framework.Utilities.TextUtilities.insertMockDiv(font);
        var $1 = [];
        var $2 = new String();
        var $3;
        var $4;
        while (!(text == null && !text)) {
            $4 = true;
            $2 = new String();
            for ($3 = 0; $3 < text.length; $3++) {
                if (text.charAt($3) === '\n') {
                    text = text.substr($2.length + 1);
                    $1.add($2.substring(0, $2.length));
                    $4 = false;
                    break;
                } else {
                    $2 = $2 + text.charAt($3);
                    if (PerfectWidgets.Framework.Utilities.TextUtilities.$2($0, $2).x > lineWidth) {
                        text = text.substr($2.length - 1);
                        $1.add($2.substring(0, $2.length - 1));
                        $4 = false;
                        break;
                    }
                }
            }
            if ($4) {
                $1.add(text);
                text = null;
                break;
            }
        }
        PerfectWidgets.Framework.Utilities.TextUtilities.deleteMockDiv($0);
        return $1;
    }
    PerfectWidgets.Framework.Utilities.TextUtilities.wordWrapText = function(text, lineWidth, font) {
        var $0 = PerfectWidgets.Framework.Utilities.TextUtilities.insertMockDiv(font);
        var $1 = [];
        var $2 = new String();
        var $3;
        var $4 = text.split('\n');
        var $5 = $4;
        for (var $6 = 0; $6 < $5.length; $6++) {
            if (PerfectWidgets.Framework.Utilities.TextUtilities.$2($0, $5[$6]).x > lineWidth) {
                var $7 = [];
                var $8 = $5[$6] + '';
                var $9 = $8.split(' ');
                var $A = new ss.StringBuilder('');
                var $B = new ss.StringBuilder('');
                for (var $C = 0; $C < $9.length; $C++) {
                    var $D = '' + $9[$C];
                    while (!$D) {
                        $C++;
                        $D = '' + $9[$C];
                    }
                    $B.append($D + ' ');
                    while (!$A.toString() && PerfectWidgets.Framework.Utilities.TextUtilities.$2($0, $B.toString()).x > lineWidth) {
                        var $E = new ss.StringBuilder('');
                        var $F = new ss.StringBuilder('');
                        for (var $10 = 0; $10 < $D.length; $10++) {
                            $F.append($D.charAt($10));
                            if (PerfectWidgets.Framework.Utilities.TextUtilities.$2($0, $F.toString()).x > lineWidth) {
                                $7.add($E.toString());
                                $E = new ss.StringBuilder('');
                                $F = new ss.StringBuilder($D.charAt($10).toString());
                            }
                            $E = new ss.StringBuilder($F.toString());
                        }
                        $A = new ss.StringBuilder('');
                        $B = new ss.StringBuilder($E.toString());
                    }
                    if (PerfectWidgets.Framework.Utilities.TextUtilities.$2($0, $B.toString()).x > lineWidth) {
                        $7.add($A.toString());
                        $A = new ss.StringBuilder('');
                        $B = new ss.StringBuilder($D + ' ');
                    }
                    $A = new ss.StringBuilder($B.toString());
                }
                $7.add($A.toString());
                for (var $11 = 0; $11 < $7.length; $11++) {
                    $1.add($7[$11]);
                }
            } else {
                $1.add($5[$6]);
            }
        }
        PerfectWidgets.Framework.Utilities.TextUtilities.deleteMockDiv($0);
        return $1;
    }
    PerfectWidgets.Framework.Utilities.TextUtilities.measureText = function(text, font, measuringDiv) {
        var $0 = PerfectWidgets.Framework.Utilities.TextUtilities.$2(measuringDiv, text);
        return $0;
    }
    PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing = function(style1, style2) {
        return ((style1 & style2)) > 0;
    }
    PerfectWidgets.Framework.Utilities.TextUtilities.rasterizeText = function(font, text, position, size) {
        if (PerfectWidgets.Framework.Utilities.TextUtilities.$0 == null || PerfectWidgets.Framework.Utilities.TextUtilities.$1 == null) {
            PerfectWidgets.Framework.Utilities.TextUtilities.$3(size);
        }
        PerfectWidgets.Framework.Utilities.TextUtilities.$1.fillStyle = 'Black';
        PerfectWidgets.Framework.Utilities.TextUtilities.$1.strokeStyle = 'Black';
        PerfectWidgets.Framework.Utilities.TextUtilities.$1.fillRect(0, 0, parseInt(size.x), parseInt(size.y));
        var $0 = '';
        if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, 2)) {
            $0 += 'italic ';
        }
        if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, 1)) {
            $0 += 'bold ';
        }
        PerfectWidgets.Framework.Utilities.TextUtilities.$1.font = font.sizeInPoints + 'pt ' + font.fontFamily.name;
        PerfectWidgets.Framework.Utilities.TextUtilities.$1.font = $0 + '' + PerfectWidgets.Framework.Utilities.TextUtilities.$1.font;
        PerfectWidgets.Framework.Utilities.TextUtilities.$1.fillStyle = 'White';
        PerfectWidgets.Framework.Utilities.TextUtilities.$1.fillText(text, position.x * 0.25 + 2, position.y * 0.75 + 5);
        var $1 = (PerfectWidgets.Framework.Utilities.TextUtilities.$1.getImageData(0, 0, parseInt(size.x), parseInt(size.y)).data);
        PerfectWidgets.Framework.Utilities.TextUtilities.$4();
        return $1;
    }
    PerfectWidgets.Framework.Utilities.TextUtilities.$3 = function($p0) {
        PerfectWidgets.Framework.Utilities.TextUtilities.$0 = document.createElement('canvas');
        PerfectWidgets.Framework.Utilities.TextUtilities.$0.style.visibility = 'hidden';
        PerfectWidgets.Framework.Utilities.TextUtilities.$0.setAttribute('id', '_PerpetuumCanvas');
        PerfectWidgets.Framework.Utilities.TextUtilities.$0.width = parseInt($p0.x);
        PerfectWidgets.Framework.Utilities.TextUtilities.$0.height = parseInt($p0.y);
        document.body.appendChild(PerfectWidgets.Framework.Utilities.TextUtilities.$0);
        PerfectWidgets.Framework.Utilities.TextUtilities.$1 = PerfectWidgets.Framework.Utilities.TextUtilities.$0.getContext('2d');
        if (PerfectWidgets.Framework.Utilities.TextUtilities.$0 == null || PerfectWidgets.Framework.Utilities.TextUtilities.$1 == null) {
            throw new Error('Can not create canvas element');
        }
    }
    PerfectWidgets.Framework.Utilities.TextUtilities.$4 = function() {
        if (PerfectWidgets.Framework.Utilities.TextUtilities.$0 != null) {
            document.body.removeChild(PerfectWidgets.Framework.Utilities.TextUtilities.$0);
            PerfectWidgets.Framework.Utilities.TextUtilities.$1 = null;
            PerfectWidgets.Framework.Utilities.TextUtilities.$0 = null;
        }
    }
    PerfectWidgets.Framework.Utilities.MathHelper = function() {}
    PerfectWidgets.Framework.Utilities.MathHelper.sign = function(n) {
        if (n > 0) {
            return 1;
        } else if (n < 0) {
            return -1;
        } else {
            return 0;
        }
    }
    PerfectWidgets.Framework.Utilities.MathHelper.round = function(num, dec) {
        return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    }
    PerfectWidgets.Framework.Utilities.MathHelper.log = function(value, b) {
        return Math.log(value) / Math.log(b);
    }
    PerfectWidgets.Framework.Utilities.Guid = function() {}
    PerfectWidgets.Framework.Utilities.Guid.s = function() {
        var $0 = ((1 + Math.random()) * 65536).toString(16);
        var $1 = $0.length;
        return $0.substr($1 - 2, 1);
    }
    PerfectWidgets.Framework.Utilities.Guid.newGuid = function() {
        return PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s() + '-' + PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s() + '-' + PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s() + PerfectWidgets.Framework.Utilities.Guid.s();
    }
    Type.registerNamespace('PerfectWidgets.Drawing');
    PerfectWidgets.Drawing.Font = function() {}
    PerfectWidgets.Drawing.Font.prototype = {
        name: null,
        sizeInPoints: 0,
        style: 0,
        fontFamily: null
    }
    Type.registerNamespace('PerfectWidgets.Framework.Geometry');
    PerfectWidgets.Framework.Geometry.GeometryUtilities = function() {}
    PerfectWidgets.Framework.Geometry.GeometryUtilities.radianToDegree = function(angel) {
        return angel * 180 / Math.PI;
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipse = function(boundedBox) {
        var $0 = boundedBox.width / Math.sqrt(2);
        var $1 = boundedBox.height / Math.sqrt(2);
        return new PerfectWidgets.Framework.DataObjects.Ellipse(boundedBox.getCenter(), new PerfectWidgets.Framework.DataObjects.Vector($0, $1));
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.getTransformMatrix = function(center, angle) {
        var $0 = Math.sin(angle);
        var $1 = Math.cos(angle);
        var $2 = $0;
        var $3 = $1;
        var $4 = -$1;
        var $5 = $0;
        var $6 = center.x * (1 - $0) + center.y * $1;
        var $7 = center.y * (1 - $0) - center.x * $1;
        return PerfectWidgets.Framework.DataObjects.Matrix.buildTransformationMatrix($2, $3, $4, $5, $6, $7);
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint = function(center, radii, angleInDegrees) {
        if (angleInDegrees < 0) {
            angleInDegrees = angleInDegrees % 360 + 360;
        } else {
            angleInDegrees = angleInDegrees % 360;
        }
        var $0, $1, $2, $3, $4, $5;
        $4 = Math.PI * angleInDegrees / 180;
        $0 = radii.x;
        $1 = radii.y;
        $5 = Math.tan($4);
        if (Math.abs($5) > PerfectWidgets.Framework.Geometry.GeometryUtilities.$0) {
            $2 = center.x;
            if ($4 > 4.69 && $4 < 4.72) {
                $3 = center.y - $1;
            } else {
                $3 = center.y + $1;
            }
        } else {
            if (radii !== PerfectWidgets.Framework.DataObjects.Vector.empty) {
                $2 = center.x + Math.sqrt($0 * $0 * $1 * $1 / ($1 * $1 + $0 * $0 * $5 * $5)) * PerfectWidgets.Framework.Utilities.MathHelper.sign(Math.cos($4));
                $3 = center.y + ($2 - center.x) * $5;
            } else {
                $2 = center.x;
                $3 = center.y;
            }
        }
        return new PerfectWidgets.Framework.DataObjects.Vector($2, $3);
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipseRadius = function(ellipseBounds, angle) {
        var $0 = ellipseBounds.height / 2;
        var $1 = ellipseBounds.width / 2;
        var $2 = Math.cos(angle);
        var $3 = Math.sin(angle);
        return $1 * $0 / Math.sqrt($0 * $0 * $2 * $2 + $1 * $1 * $3 * $3);
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.isLineIncludePoint = function(point, sPoint, ePoint, accuracy) {
        var $0 = ePoint.minus(sPoint);
        var $1 = ePoint.minus(point);
        var $2 = $1.getRotation() - $0.getRotation();
        $1.setRotation($2);
        return ($1.x <= $0.getLength()) && ($1.x >= 0) && (Math.abs($1.y) < accuracy);
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.rotateVector = function(v, center, alpha) {
        var $0 = v.minus(center);
        var $1 = $0.getRotation() + alpha;
        $0.setRotation($1);
        return $0.add(center);
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.getPolygonBox = function(polygonPoints) {
        if (!polygonPoints.length) {
            return PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
        }
        var $0 = polygonPoints[0].x;
        var $1 = polygonPoints[0].y;
        var $2 = polygonPoints[0].x;
        var $3 = polygonPoints[0].y;
        var $enum1 = ss.IEnumerator.getEnumerator(polygonPoints);
        while ($enum1.moveNext()) {
            var $4 = $enum1.current;
            if ($0 > $4.x) {
                $0 = $4.x;
            }
            if ($1 > $4.y) {
                $1 = $4.y;
            }
            if ($2 < $4.x) {
                $2 = $4.x;
            }
            if ($3 < $4.y) {
                $3 = $4.y;
            }
        }
        return new PerfectWidgets.Framework.DataObjects.VectorRectangle($0, $1, $2 - $0, $3 - $1);
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.isIncludePoint = function(polygonPoints, point) {
        if (polygonPoints.length < 3) {
            return false;
        }
        var $0 = 0;
        for (var $1 = 0; $1 < polygonPoints.length - 1; $1++) {
            $0 += (PerfectWidgets.Framework.Geometry.GeometryUtilities.$1(polygonPoints[$1], polygonPoints[$1 + 1], point)) ? 1 : 0;
        }
        $0 += (PerfectWidgets.Framework.Geometry.GeometryUtilities.$1(polygonPoints[0], polygonPoints[polygonPoints.length - 1], point)) ? 1 : 0;
        return $0 % 2 === 1;
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.$1 = function($p0, $p1, $p2) {
        var $0 = 0;
        var $1 = 1E-05;
        if (Math.abs($p0.y - $p1.y) < $1) {
            if ((Math.abs($p2.y - $p0.y) < $1) && (($p2.x - $p0.x) * ($p2.x - $p1.x) < 0)) {
                return false;
            }
        }
        if (($p0.y - $p2.y) * ($p1.y - $p2.y) > 0) {
            return false;
        }
        $0 = $p1.x - ($p1.y - $p2.y) / ($p1.y - $p0.y) * ($p1.x - $p0.x);
        if (Math.abs($0 - $p2.x) < $1) {
            return false;
        }
        if ($0 < $p2.x) {
            if ((Math.abs($p0.y - $p2.y) < $1) && ($p0.y < $p1.y)) {
                return false;
            }
            if ((Math.abs($p1.y - $p2.y) < $1) && ($p1.y < $p0.y)) {
                return false;
            }
            return true;
        }
        return false;
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.degreeToRadian = function(angle) {
        return angle * Math.PI / 180;
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.getDistance = function(point1, point2) {
        return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
    }
    PerfectWidgets.Framework.Geometry.GeometryUtilities.isPieIncludePoint = function(point, bounds, angle, startAngle, sweepAngle, accuracy) {
        var $0 = bounds.getSize().x / 2 + accuracy;
        var $1 = bounds.getSize().y / 2 + accuracy;
        var $2 = PerfectWidgets.Framework.Geometry.GeometryUtilities.rotateVector(point, bounds.getCenter(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(-angle)).minus(bounds.getCenter());
        var $3 = (PerfectWidgets.Framework.DataObjects.Vector.toDegrees($2.getRotation()) + 360) % 360;
        var $4 = $2.x * $2.x / $0 / $0 + $2.y * $2.y / $1 / $1;
        var $5 = startAngle;
        var $6 = sweepAngle;
        if ($6 < 0) {
            $5 = $5 + $6;
            $6 = -$6;
        }
        return ($4 <= 1) && (($3 - $5 + 360) % 360 <= $6);
    }
    Type.registerNamespace('PerfectWidgets.Framework.Styles');
    PerfectWidgets.Framework.Styles.Style = function() {}
    PerfectWidgets.Framework.Styles.Style.prototype = {
        $0: null,
        getFill: function() {
            return this.$0;
        },
        setFill: function(fillValue) {
            this.$0 = fillValue;
        },
        $1: null,
        getFont: function() {
            return this.$1;
        },
        setFont: function(fontValue) {
            this.$1 = fontValue;
        },
        $2: null,
        getImage: function() {
            return this.$2;
        },
        setImage: function(imageValue) {
            this.$2 = imageValue;
        },
        $3: null,
        getName: function() {
            return this.$3;
        },
        setName: function(nameValue) {
            this.$3 = nameValue;
        },
        $4: null,
        getStroke: function() {
            return this.$4;
        },
        setStroke: function(strokeValue) {
            this.$4 = strokeValue;
        },
        toString: function() {
            return this.getName() || '';
        }
    }
    PerfectWidgets.Framework.Styles.StyleCollection = function() {
        this.$0 = [];
    }
    PerfectWidgets.Framework.Styles.StyleCollection.prototype = {
        $0: null,
        add: function(value) {
            var $0 = this.$0.length;
            this.onInsert($0, value);
            this.$0.add(value);
            this.onInsertComplete($0, value);
            return value;
        },
        addRange: function(values) {
            var $enum1 = ss.IEnumerator.getEnumerator(values);
            while ($enum1.moveNext()) {
                var $0 = $enum1.current;
                this.add($0);
            }
        },
        remove: function(value) {
            var $0 = value;
            var $1 = this.$0.indexOf($0);
            this.$0.remove(value);
            this.onRemoveComplete($1, $0);
        },
        insert: function(index, value) {
            this.onInsert(index, value);
            this.$0.insert(index, value);
            this.onInsertComplete(index, value);
        },
        contains: function(value) {
            return this.$0.contains(Type.safeCast(value, Object));
        },
        indexOf: function(value) {
            return this.$0.indexOf(value);
        },
        count: function() {
            return this.$0.length;
        },
        getStyleByIndex: function(index) {
            return (Type.safeCast(this.$0[index], PerfectWidgets.Framework.Styles.Style));
        },
        setStyleByIndex: function(index, style) {
            this.$0[index] = style;
        },
        getStyleByName: function(styleName) {
            var $enum1 = ss.IEnumerator.getEnumerator(this.$0);
            while ($enum1.moveNext()) {
                var $0 = $enum1.current;
                if ($0.getName() === styleName) {
                    return $0;
                }
            }
            return null;
        },
        setStyleByName: function(styleName, style) {},
        onInsert: function(index, value) {
            if (this.contains(Type.safeCast(value, PerfectWidgets.Framework.Styles.Style))) {
                throw new Error('AddElementTwice');
            }
        },
        onInsertComplete: function(index, value) {},
        onRemoveComplete: function(index, value) {},
        onValidate: function(value) {
            if (!(Type.canCast(value, PerfectWidgets.Framework.Styles.Style))) {
                throw new Error('InvalidTypeObjectPlaceInCollection');
            }
        },
        clear: function() {
            this.$0.clear();
        }
    }
    Type.registerNamespace('PerfectWidgets.Framework.Transformation');
    PerfectWidgets.Framework.Transformation.AbstractTransformation = function() {}
    PerfectWidgets.Framework.Transformation.MockTransformation = function() {
        PerfectWidgets.Framework.Transformation.MockTransformation.initializeBase(this);
    }
    PerfectWidgets.Framework.Transformation.MockTransformation.prototype = {
        apply: function(position) {
            return position;
        },
        reverse: function(position) {
            return position;
        },
        getTransformationMatrix: function() {
            return PerfectWidgets.Framework.DataObjects.Matrix.eye(3);
        }
    }
    PerfectWidgets.Framework.Transformation.MatrixTransformation = function(m) {
        PerfectWidgets.Framework.Transformation.MatrixTransformation.initializeBase(this);
        this.$0 = m;
    }
    PerfectWidgets.Framework.Transformation.MatrixTransformation.prototype = {
        $0: null,
        $1: null,
        $2: function($p0, $p1) {
            var $0 = new PerfectWidgets.Framework.DataObjects.Matrix(3, 1);
            $0.set(0, 0, $p1.x);
            $0.set(1, 0, $p1.y);
            $0.set(2, 0, 1);
            var $1 = $p0.multiply($0);
            return new PerfectWidgets.Framework.DataObjects.Vector($1.get(0, 0), $1.get(1, 0));
        },
        apply: function(position) {
            return this.$2(this.$0, position);
        },
        reverse: function(position) {
            if (this.$1 == null) {
                this.$1 = this.$0.reverse();
            }
            return this.$2(this.$1, position);
        },
        getTransformationMatrix: function() {
            return this.$0;
        },
        setTransformationMatrix: function(matrix) {
            this.$0 = matrix;
        }
    }
    PerfectWidgets.Framework.Transformation.RotateTransformation = function() {
        PerfectWidgets.Framework.Transformation.RotateTransformation.initializeBase(this);
    }
    PerfectWidgets.Framework.Transformation.RotateTransformation.prototype = {
        $0: 0,
        $1: null,
        getAngle: function() {
            return this.$0;
        },
        setAngle: function(angle) {
            this.$0 = angle;
        },
        getCenter: function() {
            return this.$1;
        },
        setCenter: function(center) {
            this.$1 = center;
        },
        $2: function($p0, $p1, $p2) {
            var $0 = $p2.minus($p0);
            var $1 = PerfectWidgets.Framework.Geometry.GeometryUtilities.degreeToRadian($p1);
            var $2 = $0.x * Math.cos($1) - $0.y * Math.sin($1);
            var $3 = $0.x * Math.sin($1) + $0.y * Math.cos($1);
            return new PerfectWidgets.Framework.DataObjects.Vector($2, $3).add($p0);
        },
        apply: function(position) {
            return this.$2(this.$1, this.$0, position);
        },
        reverse: function(position) {
            return this.$2(this.$1, -this.$0, position);
        },
        getTransformationMatrix: function() {
            return PerfectWidgets.Framework.DataObjects.Matrix.buildTranslationMatrix(-this.$1.x, -this.$1.y).multiply(PerfectWidgets.Framework.DataObjects.Matrix.buildRotationMatrix(this.$0)).multiply(PerfectWidgets.Framework.DataObjects.Matrix.buildTranslationMatrix(this.$1.x, this.$1.y));
        }
    }
    PerfectWidgets.Framework.Transformation.ScaleTransformation = function() {
        PerfectWidgets.Framework.Transformation.ScaleTransformation.initializeBase(this);
    }
    PerfectWidgets.Framework.Transformation.ScaleTransformation.prototype = {
        $0: null,
        getScale: function() {
            return this.$0;
        },
        setScale: function(scale) {
            this.$0 = scale;
        },
        apply: function(position) {
            return position.multiply(this.$0);
        },
        reverse: function(position) {
            return position.divide(this.$0);
        },
        getTransformationMatrix: function() {
            return PerfectWidgets.Framework.DataObjects.Matrix.buildScaleMatrix(this.$0.x, this.$0.y);
        }
    }
    PerfectWidgets.Framework.Transformation.TranslateTransformation = function() {
        PerfectWidgets.Framework.Transformation.TranslateTransformation.initializeBase(this);
    }
    PerfectWidgets.Framework.Transformation.TranslateTransformation.prototype = {
        $0: null,
        getTranslation: function() {
            return this.$0;
        },
        setTranslation: function(translation) {
            this.$0 = translation;
        },
        apply: function(position) {
            return position.add(this.$0);
        },
        reverse: function(position) {
            return position.minus(this.$0);
        },
        getTransformationMatrix: function() {
            return PerfectWidgets.Framework.DataObjects.Matrix.buildTranslationMatrix(this.$0.x, this.$0.y);
        }
    }
    PerfectWidgets.Framework.DataObjects.Ellipse.registerClass('PerfectWidgets.Framework.DataObjects.Ellipse');
    PerfectWidgets.Framework.DataObjects.Matrix.registerClass('PerfectWidgets.Framework.DataObjects.Matrix');
    PerfectWidgets.Framework.DataObjects.RangeValue.registerClass('PerfectWidgets.Framework.DataObjects.RangeValue');
    PerfectWidgets.Framework.DataObjects.Segment.registerClass('PerfectWidgets.Framework.DataObjects.Segment');
    PerfectWidgets.Framework.DataObjects.Point.registerClass('PerfectWidgets.Framework.DataObjects.Point');
    PerfectWidgets.Framework.DataObjects.Vector.registerClass('PerfectWidgets.Framework.DataObjects.Vector');
    PerfectWidgets.Framework.DataObjects.VectorRectangle.registerClass('PerfectWidgets.Framework.DataObjects.VectorRectangle');
    PerfectWidgets.Framework.Drawing.Fill.registerClass('PerfectWidgets.Framework.Drawing.Fill');
    PerfectWidgets.Framework.Drawing.MultiGradientFill.registerClass('PerfectWidgets.Framework.Drawing.MultiGradientFill', PerfectWidgets.Framework.Drawing.Fill);
    PerfectWidgets.Framework.Drawing.ConicalFill.registerClass('PerfectWidgets.Framework.Drawing.ConicalFill', PerfectWidgets.Framework.Drawing.MultiGradientFill);
    PerfectWidgets.Framework.Drawing.Stroke.registerClass('PerfectWidgets.Framework.Drawing.Stroke');
    PerfectWidgets.Framework.Drawing.Colorizer.registerClass('PerfectWidgets.Framework.Drawing.Colorizer');
    PerfectWidgets.Framework.Drawing.ColorSection.registerClass('PerfectWidgets.Framework.Drawing.ColorSection');
    PerfectWidgets.Framework.Drawing.EllipticArcParameters.registerClass('PerfectWidgets.Framework.Drawing.EllipticArcParameters');
    PerfectWidgets.Framework.Drawing.FontFamily.registerClass('PerfectWidgets.Framework.Drawing.FontFamily');
    PerfectWidgets.Framework.Drawing.GradientColor.registerClass('PerfectWidgets.Framework.Drawing.GradientColor');
    PerfectWidgets.Framework.Drawing.GradientColorCollection.registerClass('PerfectWidgets.Framework.Drawing.GradientColorCollection');
    PerfectWidgets.Framework.Drawing.GraphicsPathElement.registerClass('PerfectWidgets.Framework.Drawing.GraphicsPathElement');
    PerfectWidgets.Framework.Drawing.GraphicsUtilites.registerClass('PerfectWidgets.Framework.Drawing.GraphicsUtilites');
    PerfectWidgets.Framework.Drawing.HatchFill.registerClass('PerfectWidgets.Framework.Drawing.HatchFill', PerfectWidgets.Framework.Drawing.Fill);
    PerfectWidgets.Framework.Drawing._LinearGradientBrush.registerClass('PerfectWidgets.Framework.Drawing._LinearGradientBrush');
    PerfectWidgets.Framework.Drawing.PathElementCollection.registerClass('PerfectWidgets.Framework.Drawing.PathElementCollection', PerfectWidgets.Framework.Drawing.GraphicsPathElement);
    PerfectWidgets.Framework.Drawing.SectionsColorizer.registerClass('PerfectWidgets.Framework.Drawing.SectionsColorizer', PerfectWidgets.Framework.Drawing.Colorizer);
    PerfectWidgets.Framework.Drawing.SingleColorColorizer.registerClass('PerfectWidgets.Framework.Drawing.SingleColorColorizer', PerfectWidgets.Framework.Drawing.Colorizer);
    PerfectWidgets.Framework.Drawing.Brush.registerClass('PerfectWidgets.Framework.Drawing.Brush');
    PerfectWidgets.Framework.Drawing.SolidBrush.registerClass('PerfectWidgets.Framework.Drawing.SolidBrush', PerfectWidgets.Framework.Drawing.Brush);
    PerfectWidgets.Framework.Drawing.SphericalFill.registerClass('PerfectWidgets.Framework.Drawing.SphericalFill', PerfectWidgets.Framework.Drawing.Fill);
    PerfectWidgets.Framework.Drawing.Color.registerClass('PerfectWidgets.Framework.Drawing.Color');
    PerfectWidgets.Framework.Drawing.ColorTranslator.registerClass('PerfectWidgets.Framework.Drawing.ColorTranslator');
    PerfectWidgets.Framework.Drawing.EmptyFill.registerClass('PerfectWidgets.Framework.Drawing.EmptyFill', PerfectWidgets.Framework.Drawing.Fill);
    PerfectWidgets.Framework.Drawing.GraphicsPath.registerClass('PerfectWidgets.Framework.Drawing.GraphicsPath');
    PerfectWidgets.Framework.Drawing.Image.registerClass('PerfectWidgets.Framework.Drawing.Image');
    PerfectWidgets.Framework.Drawing.KnownColorTable.registerClass('PerfectWidgets.Framework.Drawing.KnownColorTable');
    PerfectWidgets.Framework.Drawing.LinearGradientFill.registerClass('PerfectWidgets.Framework.Drawing.LinearGradientFill', PerfectWidgets.Framework.Drawing.Fill);
    PerfectWidgets.Framework.Drawing.Margins.registerClass('PerfectWidgets.Framework.Drawing.Margins');
    PerfectWidgets.Framework.Drawing.Pen.registerClass('PerfectWidgets.Framework.Drawing.Pen');
    PerfectWidgets.Framework.Drawing.SolidFill.registerClass('PerfectWidgets.Framework.Drawing.SolidFill', PerfectWidgets.Framework.Drawing.Fill);
    PerfectWidgets.Framework.Drawing.Unit.registerClass('PerfectWidgets.Framework.Drawing.Unit');
    PerfectWidgets.Framework.Utilities.BuiltIn.registerClass('PerfectWidgets.Framework.Utilities.BuiltIn');
    PerfectWidgets.Framework.Utilities.TextUtilities.registerClass('PerfectWidgets.Framework.Utilities.TextUtilities');
    PerfectWidgets.Framework.Utilities.MathHelper.registerClass('PerfectWidgets.Framework.Utilities.MathHelper');
    PerfectWidgets.Framework.Utilities.Guid.registerClass('PerfectWidgets.Framework.Utilities.Guid');
    PerfectWidgets.Drawing.Font.registerClass('PerfectWidgets.Drawing.Font');
    PerfectWidgets.Framework.Geometry.GeometryUtilities.registerClass('PerfectWidgets.Framework.Geometry.GeometryUtilities');
    PerfectWidgets.Framework.Styles.Style.registerClass('PerfectWidgets.Framework.Styles.Style');
    PerfectWidgets.Framework.Styles.StyleCollection.registerClass('PerfectWidgets.Framework.Styles.StyleCollection');
    PerfectWidgets.Framework.Transformation.AbstractTransformation.registerClass('PerfectWidgets.Framework.Transformation.AbstractTransformation');
    PerfectWidgets.Framework.Transformation.MockTransformation.registerClass('PerfectWidgets.Framework.Transformation.MockTransformation', PerfectWidgets.Framework.Transformation.AbstractTransformation);
    PerfectWidgets.Framework.Transformation.MatrixTransformation.registerClass('PerfectWidgets.Framework.Transformation.MatrixTransformation', PerfectWidgets.Framework.Transformation.AbstractTransformation);
    PerfectWidgets.Framework.Transformation.RotateTransformation.registerClass('PerfectWidgets.Framework.Transformation.RotateTransformation', PerfectWidgets.Framework.Transformation.AbstractTransformation);
    PerfectWidgets.Framework.Transformation.ScaleTransformation.registerClass('PerfectWidgets.Framework.Transformation.ScaleTransformation', PerfectWidgets.Framework.Transformation.AbstractTransformation);
    PerfectWidgets.Framework.Transformation.TranslateTransformation.registerClass('PerfectWidgets.Framework.Transformation.TranslateTransformation', PerfectWidgets.Framework.Transformation.AbstractTransformation);
    PerfectWidgets.Framework.DataObjects.Vector.empty = new PerfectWidgets.Framework.DataObjects.Vector(0, 0);
    PerfectWidgets.Framework.DataObjects.VectorRectangle.empty = new PerfectWidgets.Framework.DataObjects.VectorRectangle(0, 0, 0, 0);
    PerfectWidgets.Framework.Drawing.Stroke.emptyStroke = null;
    PerfectWidgets.Framework.Drawing.Color.$0 = 8;
    PerfectWidgets.Framework.Drawing.Color.$1 = 0;
    PerfectWidgets.Framework.Drawing.Color.$2 = 2;
    PerfectWidgets.Framework.Drawing.Color.$3 = 1;
    PerfectWidgets.Framework.Drawing.Color.$4 = 2;
    PerfectWidgets.Framework.Drawing.Color.empty = new PerfectWidgets.Framework.Drawing.Color(PerfectWidgets.Framework.Drawing.Color.$C(0, 0, 0, 0), 0, null, 0);
    PerfectWidgets.Framework.Drawing.Color.transparent = PerfectWidgets.Framework.Drawing.Color.$A(27);
    PerfectWidgets.Framework.Drawing.Color.aliceBlue = PerfectWidgets.Framework.Drawing.Color.$A(28);
    PerfectWidgets.Framework.Drawing.Color.antiqueWhite = PerfectWidgets.Framework.Drawing.Color.$A(29);
    PerfectWidgets.Framework.Drawing.Color.aqua = PerfectWidgets.Framework.Drawing.Color.$A(30);
    PerfectWidgets.Framework.Drawing.Color.aquamarine = PerfectWidgets.Framework.Drawing.Color.$A(31);
    PerfectWidgets.Framework.Drawing.Color.azure = PerfectWidgets.Framework.Drawing.Color.$A(32);
    PerfectWidgets.Framework.Drawing.Color.beige = PerfectWidgets.Framework.Drawing.Color.$A(33);
    PerfectWidgets.Framework.Drawing.Color.bisque = PerfectWidgets.Framework.Drawing.Color.$A(34);
    PerfectWidgets.Framework.Drawing.Color.black = PerfectWidgets.Framework.Drawing.Color.$A(35);
    PerfectWidgets.Framework.Drawing.Color.blanchedAlmond = PerfectWidgets.Framework.Drawing.Color.$A(36);
    PerfectWidgets.Framework.Drawing.Color.blue = PerfectWidgets.Framework.Drawing.Color.$A(37);
    PerfectWidgets.Framework.Drawing.Color.blueViolet = PerfectWidgets.Framework.Drawing.Color.$A(38);
    PerfectWidgets.Framework.Drawing.Color.brown = PerfectWidgets.Framework.Drawing.Color.$A(39);
    PerfectWidgets.Framework.Drawing.Color.burlyWood = PerfectWidgets.Framework.Drawing.Color.$A(40);
    PerfectWidgets.Framework.Drawing.Color.cadetBlue = PerfectWidgets.Framework.Drawing.Color.$A(41);
    PerfectWidgets.Framework.Drawing.Color.chartreuse = PerfectWidgets.Framework.Drawing.Color.$A(42);
    PerfectWidgets.Framework.Drawing.Color.chocolate = PerfectWidgets.Framework.Drawing.Color.$A(43);
    PerfectWidgets.Framework.Drawing.Color.control = PerfectWidgets.Framework.Drawing.Color.$A(5);
    PerfectWidgets.Framework.Drawing.Color.coral = PerfectWidgets.Framework.Drawing.Color.$A(44);
    PerfectWidgets.Framework.Drawing.Color.cornflowerBlue = PerfectWidgets.Framework.Drawing.Color.$A(45);
    PerfectWidgets.Framework.Drawing.Color.cornsilk = PerfectWidgets.Framework.Drawing.Color.$A(46);
    PerfectWidgets.Framework.Drawing.Color.crimson = PerfectWidgets.Framework.Drawing.Color.$A(47);
    PerfectWidgets.Framework.Drawing.Color.cyan = PerfectWidgets.Framework.Drawing.Color.$A(48);
    PerfectWidgets.Framework.Drawing.Color.darkBlue = PerfectWidgets.Framework.Drawing.Color.$A(49);
    PerfectWidgets.Framework.Drawing.Color.darkCyan = PerfectWidgets.Framework.Drawing.Color.$A(50);
    PerfectWidgets.Framework.Drawing.Color.darkGoldenrod = PerfectWidgets.Framework.Drawing.Color.$A(51);
    PerfectWidgets.Framework.Drawing.Color.darkGray = PerfectWidgets.Framework.Drawing.Color.$A(52);
    PerfectWidgets.Framework.Drawing.Color.darkGreen = PerfectWidgets.Framework.Drawing.Color.$A(53);
    PerfectWidgets.Framework.Drawing.Color.darkKhaki = PerfectWidgets.Framework.Drawing.Color.$A(54);
    PerfectWidgets.Framework.Drawing.Color.darkMagenta = PerfectWidgets.Framework.Drawing.Color.$A(55);
    PerfectWidgets.Framework.Drawing.Color.darkOliveGreen = PerfectWidgets.Framework.Drawing.Color.$A(56);
    PerfectWidgets.Framework.Drawing.Color.darkOrange = PerfectWidgets.Framework.Drawing.Color.$A(57);
    PerfectWidgets.Framework.Drawing.Color.darkOrchid = PerfectWidgets.Framework.Drawing.Color.$A(58);
    PerfectWidgets.Framework.Drawing.Color.darkRed = PerfectWidgets.Framework.Drawing.Color.$A(59);
    PerfectWidgets.Framework.Drawing.Color.darkSalmon = PerfectWidgets.Framework.Drawing.Color.$A(60);
    PerfectWidgets.Framework.Drawing.Color.darkSeaGreen = PerfectWidgets.Framework.Drawing.Color.$A(61);
    PerfectWidgets.Framework.Drawing.Color.darkSlateBlue = PerfectWidgets.Framework.Drawing.Color.$A(62);
    PerfectWidgets.Framework.Drawing.Color.darkSlateGray = PerfectWidgets.Framework.Drawing.Color.$A(63);
    PerfectWidgets.Framework.Drawing.Color.darkTurquoise = PerfectWidgets.Framework.Drawing.Color.$A(64);
    PerfectWidgets.Framework.Drawing.Color.darkViolet = PerfectWidgets.Framework.Drawing.Color.$A(65);
    PerfectWidgets.Framework.Drawing.Color.deepPink = PerfectWidgets.Framework.Drawing.Color.$A(66);
    PerfectWidgets.Framework.Drawing.Color.deepSkyBlue = PerfectWidgets.Framework.Drawing.Color.$A(67);
    PerfectWidgets.Framework.Drawing.Color.dimGray = PerfectWidgets.Framework.Drawing.Color.$A(68);
    PerfectWidgets.Framework.Drawing.Color.dodgerBlue = PerfectWidgets.Framework.Drawing.Color.$A(69);
    PerfectWidgets.Framework.Drawing.Color.firebrick = PerfectWidgets.Framework.Drawing.Color.$A(70);
    PerfectWidgets.Framework.Drawing.Color.floralWhite = PerfectWidgets.Framework.Drawing.Color.$A(71);
    PerfectWidgets.Framework.Drawing.Color.forestGreen = PerfectWidgets.Framework.Drawing.Color.$A(72);
    PerfectWidgets.Framework.Drawing.Color.fuchsia = PerfectWidgets.Framework.Drawing.Color.$A(73);
    PerfectWidgets.Framework.Drawing.Color.gainsboro = PerfectWidgets.Framework.Drawing.Color.$A(74);
    PerfectWidgets.Framework.Drawing.Color.ghostWhite = PerfectWidgets.Framework.Drawing.Color.$A(75);
    PerfectWidgets.Framework.Drawing.Color.gold = PerfectWidgets.Framework.Drawing.Color.$A(76);
    PerfectWidgets.Framework.Drawing.Color.goldenrod = PerfectWidgets.Framework.Drawing.Color.$A(77);
    PerfectWidgets.Framework.Drawing.Color.gray = PerfectWidgets.Framework.Drawing.Color.$A(78);
    PerfectWidgets.Framework.Drawing.Color.green = PerfectWidgets.Framework.Drawing.Color.$A(79);
    PerfectWidgets.Framework.Drawing.Color.greenYellow = PerfectWidgets.Framework.Drawing.Color.$A(80);
    PerfectWidgets.Framework.Drawing.Color.honeydew = PerfectWidgets.Framework.Drawing.Color.$A(81);
    PerfectWidgets.Framework.Drawing.Color.hotPink = PerfectWidgets.Framework.Drawing.Color.$A(82);
    PerfectWidgets.Framework.Drawing.Color.indianRed = PerfectWidgets.Framework.Drawing.Color.$A(83);
    PerfectWidgets.Framework.Drawing.Color.indigo = PerfectWidgets.Framework.Drawing.Color.$A(84);
    PerfectWidgets.Framework.Drawing.Color.ivory = PerfectWidgets.Framework.Drawing.Color.$A(85);
    PerfectWidgets.Framework.Drawing.Color.khaki = PerfectWidgets.Framework.Drawing.Color.$A(86);
    PerfectWidgets.Framework.Drawing.Color.lavender = PerfectWidgets.Framework.Drawing.Color.$A(87);
    PerfectWidgets.Framework.Drawing.Color.lavenderBlush = PerfectWidgets.Framework.Drawing.Color.$A(88);
    PerfectWidgets.Framework.Drawing.Color.lawnGreen = PerfectWidgets.Framework.Drawing.Color.$A(89);
    PerfectWidgets.Framework.Drawing.Color.lemonChiffon = PerfectWidgets.Framework.Drawing.Color.$A(90);
    PerfectWidgets.Framework.Drawing.Color.lightBlue = PerfectWidgets.Framework.Drawing.Color.$A(91);
    PerfectWidgets.Framework.Drawing.Color.lightCoral = PerfectWidgets.Framework.Drawing.Color.$A(92);
    PerfectWidgets.Framework.Drawing.Color.lightCyan = PerfectWidgets.Framework.Drawing.Color.$A(93);
    PerfectWidgets.Framework.Drawing.Color.lightGoldenrodYellow = PerfectWidgets.Framework.Drawing.Color.$A(94);
    PerfectWidgets.Framework.Drawing.Color.lightGreen = PerfectWidgets.Framework.Drawing.Color.$A(96);
    PerfectWidgets.Framework.Drawing.Color.lightGray = PerfectWidgets.Framework.Drawing.Color.$A(95);
    PerfectWidgets.Framework.Drawing.Color.lightPink = PerfectWidgets.Framework.Drawing.Color.$A(97);
    PerfectWidgets.Framework.Drawing.Color.lightSalmon = PerfectWidgets.Framework.Drawing.Color.$A(98);
    PerfectWidgets.Framework.Drawing.Color.lightSeaGreen = PerfectWidgets.Framework.Drawing.Color.$A(99);
    PerfectWidgets.Framework.Drawing.Color.lightSkyBlue = PerfectWidgets.Framework.Drawing.Color.$A(100);
    PerfectWidgets.Framework.Drawing.Color.lightSlateGray = PerfectWidgets.Framework.Drawing.Color.$A(101);
    PerfectWidgets.Framework.Drawing.Color.lightSteelBlue = PerfectWidgets.Framework.Drawing.Color.$A(102);
    PerfectWidgets.Framework.Drawing.Color.lightYellow = PerfectWidgets.Framework.Drawing.Color.$A(103);
    PerfectWidgets.Framework.Drawing.Color.lime = PerfectWidgets.Framework.Drawing.Color.$A(104);
    PerfectWidgets.Framework.Drawing.Color.limeGreen = PerfectWidgets.Framework.Drawing.Color.$A(105);
    PerfectWidgets.Framework.Drawing.Color.linen = PerfectWidgets.Framework.Drawing.Color.$A(106);
    PerfectWidgets.Framework.Drawing.Color.magenta = PerfectWidgets.Framework.Drawing.Color.$A(107);
    PerfectWidgets.Framework.Drawing.Color.maroon = PerfectWidgets.Framework.Drawing.Color.$A(108);
    PerfectWidgets.Framework.Drawing.Color.mediumAquamarine = PerfectWidgets.Framework.Drawing.Color.$A(109);
    PerfectWidgets.Framework.Drawing.Color.mediumBlue = PerfectWidgets.Framework.Drawing.Color.$A(110);
    PerfectWidgets.Framework.Drawing.Color.mediumOrchid = PerfectWidgets.Framework.Drawing.Color.$A(111);
    PerfectWidgets.Framework.Drawing.Color.mediumPurple = PerfectWidgets.Framework.Drawing.Color.$A(112);
    PerfectWidgets.Framework.Drawing.Color.mediumSeaGreen = PerfectWidgets.Framework.Drawing.Color.$A(113);
    PerfectWidgets.Framework.Drawing.Color.mediumSlateBlue = PerfectWidgets.Framework.Drawing.Color.$A(114);
    PerfectWidgets.Framework.Drawing.Color.mediumSpringGreen = PerfectWidgets.Framework.Drawing.Color.$A(115);
    PerfectWidgets.Framework.Drawing.Color.mediumTurquoise = PerfectWidgets.Framework.Drawing.Color.$A(116);
    PerfectWidgets.Framework.Drawing.Color.mediumVioletRed = PerfectWidgets.Framework.Drawing.Color.$A(117);
    PerfectWidgets.Framework.Drawing.Color.midnightBlue = PerfectWidgets.Framework.Drawing.Color.$A(118);
    PerfectWidgets.Framework.Drawing.Color.mintCream = PerfectWidgets.Framework.Drawing.Color.$A(119);
    PerfectWidgets.Framework.Drawing.Color.mistyRose = PerfectWidgets.Framework.Drawing.Color.$A(120);
    PerfectWidgets.Framework.Drawing.Color.moccasin = PerfectWidgets.Framework.Drawing.Color.$A(121);
    PerfectWidgets.Framework.Drawing.Color.navajoWhite = PerfectWidgets.Framework.Drawing.Color.$A(122);
    PerfectWidgets.Framework.Drawing.Color.navy = PerfectWidgets.Framework.Drawing.Color.$A(123);
    PerfectWidgets.Framework.Drawing.Color.oldLace = PerfectWidgets.Framework.Drawing.Color.$A(124);
    PerfectWidgets.Framework.Drawing.Color.olive = PerfectWidgets.Framework.Drawing.Color.$A(125);
    PerfectWidgets.Framework.Drawing.Color.oliveDrab = PerfectWidgets.Framework.Drawing.Color.$A(126);
    PerfectWidgets.Framework.Drawing.Color.orange = PerfectWidgets.Framework.Drawing.Color.$A(127);
    PerfectWidgets.Framework.Drawing.Color.orangeRed = PerfectWidgets.Framework.Drawing.Color.$A(128);
    PerfectWidgets.Framework.Drawing.Color.orchid = PerfectWidgets.Framework.Drawing.Color.$A(129);
    PerfectWidgets.Framework.Drawing.Color.paleGoldenrod = PerfectWidgets.Framework.Drawing.Color.$A(130);
    PerfectWidgets.Framework.Drawing.Color.paleGreen = PerfectWidgets.Framework.Drawing.Color.$A(131);
    PerfectWidgets.Framework.Drawing.Color.paleTurquoise = PerfectWidgets.Framework.Drawing.Color.$A(132);
    PerfectWidgets.Framework.Drawing.Color.paleVioletRed = PerfectWidgets.Framework.Drawing.Color.$A(133);
    PerfectWidgets.Framework.Drawing.Color.papayaWhip = PerfectWidgets.Framework.Drawing.Color.$A(134);
    PerfectWidgets.Framework.Drawing.Color.peachPuff = PerfectWidgets.Framework.Drawing.Color.$A(135);
    PerfectWidgets.Framework.Drawing.Color.peru = PerfectWidgets.Framework.Drawing.Color.$A(136);
    PerfectWidgets.Framework.Drawing.Color.pink = PerfectWidgets.Framework.Drawing.Color.$A(137);
    PerfectWidgets.Framework.Drawing.Color.plum = PerfectWidgets.Framework.Drawing.Color.$A(138);
    PerfectWidgets.Framework.Drawing.Color.powderBlue = PerfectWidgets.Framework.Drawing.Color.$A(139);
    PerfectWidgets.Framework.Drawing.Color.purple = PerfectWidgets.Framework.Drawing.Color.$A(140);
    PerfectWidgets.Framework.Drawing.Color.red = PerfectWidgets.Framework.Drawing.Color.$A(141);
    PerfectWidgets.Framework.Drawing.Color.rosyBrown = PerfectWidgets.Framework.Drawing.Color.$A(142);
    PerfectWidgets.Framework.Drawing.Color.royalBlue = PerfectWidgets.Framework.Drawing.Color.$A(143);
    PerfectWidgets.Framework.Drawing.Color.saddleBrown = PerfectWidgets.Framework.Drawing.Color.$A(144);
    PerfectWidgets.Framework.Drawing.Color.salmon = PerfectWidgets.Framework.Drawing.Color.$A(145);
    PerfectWidgets.Framework.Drawing.Color.sandyBrown = PerfectWidgets.Framework.Drawing.Color.$A(146);
    PerfectWidgets.Framework.Drawing.Color.seaGreen = PerfectWidgets.Framework.Drawing.Color.$A(147);
    PerfectWidgets.Framework.Drawing.Color.seaShell = PerfectWidgets.Framework.Drawing.Color.$A(148);
    PerfectWidgets.Framework.Drawing.Color.sienna = PerfectWidgets.Framework.Drawing.Color.$A(149);
    PerfectWidgets.Framework.Drawing.Color.silver = PerfectWidgets.Framework.Drawing.Color.$A(150);
    PerfectWidgets.Framework.Drawing.Color.skyBlue = PerfectWidgets.Framework.Drawing.Color.$A(151);
    PerfectWidgets.Framework.Drawing.Color.slateBlue = PerfectWidgets.Framework.Drawing.Color.$A(152);
    PerfectWidgets.Framework.Drawing.Color.slateGray = PerfectWidgets.Framework.Drawing.Color.$A(153);
    PerfectWidgets.Framework.Drawing.Color.snow = PerfectWidgets.Framework.Drawing.Color.$A(154);
    PerfectWidgets.Framework.Drawing.Color.springGreen = PerfectWidgets.Framework.Drawing.Color.$A(155);
    PerfectWidgets.Framework.Drawing.Color.steelBlue = PerfectWidgets.Framework.Drawing.Color.$A(156);
    PerfectWidgets.Framework.Drawing.Color.tan = PerfectWidgets.Framework.Drawing.Color.$A(157);
    PerfectWidgets.Framework.Drawing.Color.teal = PerfectWidgets.Framework.Drawing.Color.$A(158);
    PerfectWidgets.Framework.Drawing.Color.thistle = PerfectWidgets.Framework.Drawing.Color.$A(159);
    PerfectWidgets.Framework.Drawing.Color.tomato = PerfectWidgets.Framework.Drawing.Color.$A(160);
    PerfectWidgets.Framework.Drawing.Color.turquoise = PerfectWidgets.Framework.Drawing.Color.$A(161);
    PerfectWidgets.Framework.Drawing.Color.violet = PerfectWidgets.Framework.Drawing.Color.$A(162);
    PerfectWidgets.Framework.Drawing.Color.wheat = PerfectWidgets.Framework.Drawing.Color.$A(163);
    PerfectWidgets.Framework.Drawing.Color.white = PerfectWidgets.Framework.Drawing.Color.$A(164);
    PerfectWidgets.Framework.Drawing.Color.whiteSmoke = PerfectWidgets.Framework.Drawing.Color.$A(165);
    PerfectWidgets.Framework.Drawing.Color.yellow = PerfectWidgets.Framework.Drawing.Color.$A(166);
    PerfectWidgets.Framework.Drawing.Color.yellowGreen = PerfectWidgets.Framework.Drawing.Color.$A(167);
    PerfectWidgets.Framework.Drawing.Fill.emptyFill = new PerfectWidgets.Framework.Drawing.EmptyFill();
    PerfectWidgets.Framework.Drawing.KnownColorTable.$0 = null;
    PerfectWidgets.Framework.Drawing.KnownColorTable.$1 = null;
    PerfectWidgets.Framework.Drawing.Margins.empty = new PerfectWidgets.Framework.Drawing.Margins(0, 0, 0, 0);
    PerfectWidgets.Framework.Drawing.Unit.standardGraphicsUnit = 5;
    PerfectWidgets.Framework.Drawing.Unit.baseUnitPerInch = 300;
    PerfectWidgets.Framework.Drawing.Unit.internalUnit = new PerfectWidgets.Framework.Drawing.Unit('InternalUnit', '', 1);
    PerfectWidgets.Framework.Drawing.Unit.millimeter = new PerfectWidgets.Framework.Drawing.Unit('Millimeter', 'mm', 300 / 25.4);
    PerfectWidgets.Framework.Drawing.Unit.centimeter = new PerfectWidgets.Framework.Drawing.Unit('Centimeter', 'cm', 300 / 2.54);
    PerfectWidgets.Framework.Drawing.Unit.inch = new PerfectWidgets.Framework.Drawing.Unit('Inch', 'in', 300);
    PerfectWidgets.Framework.Drawing.Unit.point = new PerfectWidgets.Framework.Drawing.Unit('Point', 'pt', 300 / 72);
    PerfectWidgets.Framework.Drawing.Unit.pixel = new PerfectWidgets.Framework.Drawing.Unit('Pixel', 'px', 300 / 96);
    PerfectWidgets.Framework.Drawing.Unit.twip = new PerfectWidgets.Framework.Drawing.Unit('Twip', 'tw', 300 / 1440);
    PerfectWidgets.Framework.Utilities.TextUtilities.$0 = null;
    PerfectWidgets.Framework.Utilities.TextUtilities.$1 = null;
    PerfectWidgets.Framework.Utilities.MathHelper.epsilon = 0.001;
    PerfectWidgets.Framework.Geometry.GeometryUtilities.$0 = 1000;
    PerfectWidgets.Framework.Transformation.AbstractTransformation.noTrasformation = new PerfectWidgets.Framework.Transformation.MockTransformation();
    Type.registerNamespace('PerfectWidgets.Model.Animation');
    PerfectWidgets.Model.Animation.AnimationState = function() {};
    PerfectWidgets.Model.Animation.AnimationState.prototype = {
        disabled: 1,
        dragAndDrop: 2,
        stoped: 4,
        started: 8
    }
    PerfectWidgets.Model.Animation.AnimationState.registerEnum('PerfectWidgets.Model.Animation.AnimationState', true);
    PerfectWidgets.Model.Animation.IAnimatable = function() {};
    PerfectWidgets.Model.Animation.IAnimatable.registerInterface('PerfectWidgets.Model.Animation.IAnimatable');
    PerfectWidgets.Model.Animation.EasingFunctions = function() {}
    PerfectWidgets.Model.Animation.EasingFunctions.linear = function(portion, startValue, dy, duration) {
        return portion * dy + startValue;
    }
    PerfectWidgets.Model.Animation.EasingFunctions.swing = function(portion, startValue, dy, duration) {
        return ((-Math.cos(portion * Math.PI) / 2) + 0.5) * dy + startValue;
    }
    PerfectWidgets.Model.Animation.EasingFunctions.easeInQuad = function(portion, startValue, dy, duration) {
        var $0 = portion * duration;
        return dy * $0 * $0 / duration / duration + startValue;
    }
    PerfectWidgets.Model.Animation.EasingFunctions.easeOutQuad = function(portion, startValue, dy, duration) {
        var $0 = portion * duration;
        return -dy * ($0 / duration) * ($0 / duration - 2) + startValue;
    }
    PerfectWidgets.Model.Animation.EasingFunctions.easeInOutQuad = function(portion, startValue, dy, duration) {
        var $0 = portion * duration;
        if ($0 < duration / 2) {
            return dy / 2 * (2 * $0) * (2 * $0) / duration / duration + startValue;
        } else {
            return -dy / 2 * (($0 / duration * 2 - 1) * (($0 / duration * 2 - 1) - 2) - 1) + startValue;
        }
    }
    PerfectWidgets.Model.Animation.EasingFunctions.easeInExpo = function(portion, startValue, dy, duration) {
        var $0 = portion * duration;
        return (!$0) ? startValue : dy * Math.pow(2, 10 * ($0 / duration - 1)) + startValue;
    }
    PerfectWidgets.Model.Animation.EasingFunctions.easeOutExpo = function(portion, startValue, dy, duration) {
        var $0 = portion * duration;
        return ($0 === duration) ? startValue + dy : dy * (-Math.pow(2, -10 * ($0 / duration)) + 1) + startValue;
    }
    PerfectWidgets.Model.Animation.EasingFunctions.easeInOutExpo = function(portion, startValue, dy, duration) {
        var $0 = portion * duration;
        if (!$0) {
            return startValue;
        }
        if ($0 === duration) {
            return startValue + dy;
        }
        if ($0 < 1 / 2 * duration) {
            return dy / 2 * Math.pow(2, 10 * (2 * $0 / duration - 1)) + startValue;
        }
        return dy / 2 * (-Math.pow(2, -10 * (2 * $0 / duration - 1)) + 2) + startValue;
    }
    PerfectWidgets.Model.Animation.EasingFunctions.easeInBack = function(portion, startValue, dy, duration) {
        var $0 = portion * duration;
        return dy * ($0 / duration) * $0 / duration * ((PerfectWidgets.Model.Animation.EasingFunctions.$0 + 1) * $0 / duration - PerfectWidgets.Model.Animation.EasingFunctions.$0) + startValue;
    }
    PerfectWidgets.Model.Animation.EasingFunctions.easeOutBack = function(portion, startValue, dy, duration) {
        var $0 = portion * duration;
        return dy * (($0 / duration - 1) * ($0 / duration - 1) * ((PerfectWidgets.Model.Animation.EasingFunctions.$0 + 1) * ($0 / duration - 1) + PerfectWidgets.Model.Animation.EasingFunctions.$0) + 1) + startValue;
    }
    PerfectWidgets.Model.Animation.EasingFunctions.easeInOutBack = function(portion, startValue, dy, duration) {
        var $0 = portion * duration;
        if ($0 < duration / 2) {
            return dy / 2 * (2 * $0 / duration * 2 * $0 / duration * (((PerfectWidgets.Model.Animation.EasingFunctions.$0 * 1.525) + 1) * 2 * $0 / duration - PerfectWidgets.Model.Animation.EasingFunctions.$0 * 1.525)) + startValue;
        }
        return dy / 2 * ((2 * $0 / duration - 2) * (2 * $0 / duration - 2) * (((PerfectWidgets.Model.Animation.EasingFunctions.$0 * 1.525) + 1) * (2 * $0 / duration - 2) + PerfectWidgets.Model.Animation.EasingFunctions.$0 * 1.525) + 2) + startValue;
    }
    PerfectWidgets.Model.Animation.ManualAnimation = function() {
        PerfectWidgets.Model.Animation.ManualAnimation.initializeBase(this);
    }
    PerfectWidgets.Model.Animation.ManualAnimation.prototype = {
        getAvaliableEasingFunctions: function() {
            var $0 = [];
            $0.add('linear');
            $0.add('swing');
            $0.add('easeInQuad');
            $0.add('easeOutQuad');
            $0.add('easeInOutQuad');
            $0.add('easeInExpo');
            $0.add('easeOutExpo');
            $0.add('easeInOutExpo');
            $0.add('easeInBack');
            $0.add('easeOutBack');
            $0.add('easeInOutBack');
            return $0;
        },
        $7: function() {
            var $0 = Date.get_now() - this.$A;
            var $1 = $0 / this.$B;
            if ($1 > 1) {
                $1 = 1;
            }
            $0 = ($0 > this.$B) ? this.$B : $0;
            var $2 = this.$D($1, this.getStartValue(), this.$C, this.$B);
            this.getContext().setAnimationValue($2);
            this.getContext().onAnimationValueChanged();
            this.getContext().refreshElement();
            if ($1 === 1) {
                this.getContext().onAnimationFinished();
                this.disposeAnimation();
            }
        },
        $8: 10,
        $9: 0,
        $A: null,
        $B: 0,
        $C: 0,
        $D: null,
        animate: function() {
            if (this.getContext().onAnimationStarting()) {
                this.getContext().setAnimationState(8);
                this.$A = Date.get_now();
                this.$B = parseInt((this.getDuration() * 1000));
                this.$D = this.$E(this.getEasingFunction());
                this.$C = this.getEndValue() - this.getStartValue();
                this.$9 = window.setInterval(ss.Delegate.create(this, this.$7), this.$8);
            } else {
                var $0 = this.getContext();
                $0.setAnimationState(1);
                $0['set' + this.getPropertyName()](this.getEndValue());
                $0.setAnimationState(4);
            }
        },
        $E: function($p0) {
            var $0 = null;
            switch (this.getEasingFunction()) {
                case 'linear':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.linear;
                    break;
                case 'swing':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.swing;
                    break;
                case 'easeInQuad':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.easeInQuad;
                    break;
                case 'easeOutQuad':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.easeOutQuad;
                    break;
                case 'easeInOutQuad':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.easeInOutQuad;
                    break;
                case 'easeInExpo':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.easeInExpo;
                    break;
                case 'easeOutExpo':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.easeOutExpo;
                    break;
                case 'easeInOutExpo':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.easeInOutExpo;
                    break;
                case 'easeInBack':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.easeInBack;
                    break;
                case 'easeOutBack':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.easeOutBack;
                    break;
                case 'easeInOutBack':
                    $0 = PerfectWidgets.Model.Animation.EasingFunctions.easeInOutBack;
                    break;
            }
            return $0;
        },
        onPaint: function() {
            throw new Error('ManualAnimation not implement method OnPaint');
        },
        disposeAnimation: function() {
            this.getContext().setAnimationState(4);
            window.clearInterval(this.$9);
        }
    }
    PerfectWidgets.Model.Animation.AbstractAnimation = function() {}
    PerfectWidgets.Model.Animation.AbstractAnimation.prototype = {
        $0: 0,
        $1: null,
        $2: 0,
        $3: 0,
        $4: null,
        $5: null,
        getContext: function() {
            return this.$5;
        },
        setContext: function(context) {
            this.$5 = context;
        },
        getDuration: function() {
            return Math.abs(this.getEndValue() - this.getStartValue()) / this.getValueRange() * this.$0;
        },
        setDuration: function(duration) {
            this.$0 = duration;
        },
        getEasingFunction: function() {
            return this.$1;
        },
        setEasingFunction: function(easingFunction) {
            if (easingFunction != null) {
                if (!this.getAvaliableEasingFunctions().contains(easingFunction)) {
                    throw new Error('Not supported easing function ' + easingFunction);
                }
                this.$1 = easingFunction;
            }
        },
        $6: 0,
        getValueRange: function() {
            return this.$6;
        },
        setValueRange: function(valueRangeValue) {
            this.$6 = valueRangeValue;
        },
        getStartValue: function() {
            return this.$2;
        },
        setStartValue: function(startValue) {
            this.$2 = startValue;
        },
        getEndValue: function() {
            return this.$3;
        },
        setEndValue: function(endValue) {
            this.$3 = endValue;
        },
        getPropertyName: function() {
            return this.$4;
        },
        setPropertyName: function(setterMethodName) {
            if (setterMethodName != null) {
                this.$4 = setterMethodName;
            }
        }
    }
    Type.registerNamespace('PerfectWidgets.Model.BaseElements');
    PerfectWidgets.Model.BaseElements.BevelStyle = function() {};
    PerfectWidgets.Model.BaseElements.BevelStyle.prototype = {
        none: 0,
        flat: 1,
        single: 2,
        doubled: 3,
        raised: 4,
        lowered: 5,
        doubleRaised: 6,
        doubleLowered: 7,
        frameRaised: 8,
        frameLowered: 9
    }
    PerfectWidgets.Model.BaseElements.BevelStyle.registerEnum('PerfectWidgets.Model.BaseElements.BevelStyle', false);
    PerfectWidgets.Model.BaseElements.NotchesStyle = function() {};
    PerfectWidgets.Model.BaseElements.NotchesStyle.prototype = {
        raised: 0,
        lowered: 1,
        flat: 2
    }
    PerfectWidgets.Model.BaseElements.NotchesStyle.registerEnum('PerfectWidgets.Model.BaseElements.NotchesStyle', false);
    PerfectWidgets.Model.BaseElements.SegmentType = function() {};
    PerfectWidgets.Model.BaseElements.SegmentType.prototype = {
        none: 0,
        top: 1,
        bottom: 2,
        leftTop: 4,
        rightTop: 8,
        leftBottom: 16,
        rightBottom: 32,
        middle: 64,
        all: 127
    }
    PerfectWidgets.Model.BaseElements.SegmentType.registerEnum('PerfectWidgets.Model.BaseElements.SegmentType', true);
    PerfectWidgets.Model.BaseElements.AlignmentMode = function() {};
    PerfectWidgets.Model.BaseElements.AlignmentMode.prototype = {
        far: 0,
        near: 1,
        center: 2
    }
    PerfectWidgets.Model.BaseElements.AlignmentMode.registerEnum('PerfectWidgets.Model.BaseElements.AlignmentMode', false);
    PerfectWidgets.Model.BaseElements.ShapeDirection = function() {};
    PerfectWidgets.Model.BaseElements.ShapeDirection.prototype = {
        up: 0,
        down: 1,
        left: 2,
        right: 3
    }
    PerfectWidgets.Model.BaseElements.ShapeDirection.registerEnum('PerfectWidgets.Model.BaseElements.ShapeDirection', false);
    PerfectWidgets.Model.BaseElements.LineDirection = function() {};
    PerfectWidgets.Model.BaseElements.LineDirection.prototype = {
        slash: 0,
        backSlash: 1
    }
    PerfectWidgets.Model.BaseElements.LineDirection.registerEnum('PerfectWidgets.Model.BaseElements.LineDirection', false);
    PerfectWidgets.Model.BaseElements.Effect3D = function() {};
    PerfectWidgets.Model.BaseElements.Effect3D.prototype = {
        raised: 0,
        lowered: 1,
        flat: 2
    }
    PerfectWidgets.Model.BaseElements.Effect3D.registerEnum('PerfectWidgets.Model.BaseElements.Effect3D', false);
    PerfectWidgets.Model.BaseElements.CapStyle = function() {};
    PerfectWidgets.Model.BaseElements.CapStyle.prototype = {
        flat: 0,
        rounded: 1
    }
    PerfectWidgets.Model.BaseElements.CapStyle.registerEnum('PerfectWidgets.Model.BaseElements.CapStyle', false);
    PerfectWidgets.Model.BaseElements.GuideDirection = function() {};
    PerfectWidgets.Model.BaseElements.GuideDirection.prototype = {
        free: 0,
        bottomToTop: 1,
        topToBottom: 2,
        leftToRight: 3,
        rightToLeft: 4
    }
    PerfectWidgets.Model.BaseElements.GuideDirection.registerEnum('PerfectWidgets.Model.BaseElements.GuideDirection', false);
    PerfectWidgets.Model.BaseElements.ILinkedSupported = function() {};
    PerfectWidgets.Model.BaseElements.ILinkedSupported.registerInterface('PerfectWidgets.Model.BaseElements.ILinkedSupported');
    PerfectWidgets.Model.BaseElements.ScaleKind = function() {};
    PerfectWidgets.Model.BaseElements.ScaleKind.prototype = {
        excludeMinimum: 0,
        excludeMaximum: 1,
        includeBoth: 1
    }
    PerfectWidgets.Model.BaseElements.ScaleKind.registerEnum('PerfectWidgets.Model.BaseElements.ScaleKind', false);
    PerfectWidgets.Model.BaseElements.IScale = function() {};
    PerfectWidgets.Model.BaseElements.IScale.registerInterface('PerfectWidgets.Model.BaseElements.IScale');
    PerfectWidgets.Model.BaseElements.ScaleDocking = function() {};
    PerfectWidgets.Model.BaseElements.ScaleDocking.prototype = {
        none: 0,
        inside: 1,
        outside: 2,
        center: 3
    }
    PerfectWidgets.Model.BaseElements.ScaleDocking.registerEnum('PerfectWidgets.Model.BaseElements.ScaleDocking', false);
    PerfectWidgets.Model.BaseElements.IScaleElement = function() {};
    PerfectWidgets.Model.BaseElements.IScaleElement.registerInterface('PerfectWidgets.Model.BaseElements.IScaleElement');
    PerfectWidgets.Model.BaseElements.ISlider = function() {};
    PerfectWidgets.Model.BaseElements.ISlider.registerInterface('PerfectWidgets.Model.BaseElements.ISlider');
    PerfectWidgets.Model.BaseElements.ITrajectory = function() {};
    PerfectWidgets.Model.BaseElements.ITrajectory.registerInterface('PerfectWidgets.Model.BaseElements.ITrajectory');
    PerfectWidgets.Model.BaseElements.JointDocking = function() {};
    PerfectWidgets.Model.BaseElements.JointDocking.prototype = {
        none: 0,
        center: 1,
        left: 2,
        right: 3,
        top: 4,
        bottom: 5,
        leftBottom: 6,
        leftTop: 7,
        rightBottom: 8,
        rightTop: 9
    }
    PerfectWidgets.Model.BaseElements.JointDocking.registerEnum('PerfectWidgets.Model.BaseElements.JointDocking', false);
    PerfectWidgets.Model.BaseElements.ShowMode = function() {};
    PerfectWidgets.Model.BaseElements.ShowMode.prototype = {
        showBoth: 0,
        showLeft: 1,
        showRigth: 2
    }
    PerfectWidgets.Model.BaseElements.ShowMode.registerEnum('PerfectWidgets.Model.BaseElements.ShowMode', false);
    PerfectWidgets.Model.BaseElements.TextRotationMode = function() {};
    PerfectWidgets.Model.BaseElements.TextRotationMode.prototype = {
        screen: 0,
        scale: 1
    }
    PerfectWidgets.Model.BaseElements.TextRotationMode.registerEnum('PerfectWidgets.Model.BaseElements.TextRotationMode', false);
    PerfectWidgets.Model.BaseElements.LabelPosition = function() {};
    PerfectWidgets.Model.BaseElements.LabelPosition.prototype = {
        near: 0,
        center: 1,
        far: 2
    }
    PerfectWidgets.Model.BaseElements.LabelPosition.registerEnum('PerfectWidgets.Model.BaseElements.LabelPosition', false);
    PerfectWidgets.Model.BaseElements.SmartValueKind = function() {};
    PerfectWidgets.Model.BaseElements.SmartValueKind.prototype = {
        auto: 0,
        constant: 1,
        percent: 2
    }
    PerfectWidgets.Model.BaseElements.SmartValueKind.registerEnum('PerfectWidgets.Model.BaseElements.SmartValueKind', false);
    PerfectWidgets.Model.BaseElements.StringAlignment = function() {};
    PerfectWidgets.Model.BaseElements.StringAlignment.prototype = {
        near: 0,
        center: 1,
        far: 2
    }
    PerfectWidgets.Model.BaseElements.StringAlignment.registerEnum('PerfectWidgets.Model.BaseElements.StringAlignment', false);
    PerfectWidgets.Model.BaseElements.SubTicksPosition = function() {};
    PerfectWidgets.Model.BaseElements.SubTicksPosition.prototype = {
        near: 0,
        center: 1,
        far: 2
    }
    PerfectWidgets.Model.BaseElements.SubTicksPosition.registerEnum('PerfectWidgets.Model.BaseElements.SubTicksPosition', false);
    PerfectWidgets.Model.BaseElements.Arc = function() {
        PerfectWidgets.Model.BaseElements.Arc.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Arc.prototype = {
        getHitTest: function(point) {
            return PerfectWidgets.Model.BaseElements.Arc.callBaseMethod(this, 'getHitTest', [point]);
        }
    }
    PerfectWidgets.Model.BaseElements.ArcBase = function() {
        PerfectWidgets.Model.BaseElements.ArcBase.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ArcBase.prototype = {
        $23: 0,
        getStartAngle: function() {
            return this.$23;
        },
        setStartAngle: function(startAngleValue) {
            this.$23 = startAngleValue;
        },
        $24: 0,
        getSweepAngle: function() {
            return this.$24;
        },
        setSweepAngle: function(sweepAngleValue) {
            var $0 = 0.0001;
            if (Math.abs(sweepAngleValue) > 180) {
                if (Math.abs(sweepAngleValue % 360) < $0) {
                    var $1 = (sweepAngleValue > 0) ? 1 : -1;
                    this.$24 = sweepAngleValue - ($1 * $0 * 0.1);
                    return;
                }
            }
            this.$24 = sweepAngleValue;
        },
        getBoundedBox: function() {
            var $0 = this.getBounds();
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getStartAngle());
            var $2 = PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getStartAngle() + this.getSweepAngle());
            var $3 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipseRadius($0, $1), $1).add(this.getCenter());
            var $4 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipseRadius($0, $2), $2).add(this.getCenter());
            var $5 = [];
            $5.add($3);
            $5.add($4);
            var $6 = this.getStartAngle();
            var $7 = Math.floor((this.getStartAngle() + this.getSweepAngle()) / 90) - Math.floor(this.getStartAngle() / 90);
            var $8 = ($7 > 0) ? 1 : -1;
            $7 = Math.abs($7);
            var $9 = [];
            for (var $C = 1; $C <= $7; $C++) {
                switch (($8 > 0) ? (Math.floor(this.getStartAngle() / 90 + $8 * $C) * 90 + 360) % 360 / 90 : (Math.ceil(this.getStartAngle() / 90 + $8 * $C) + 360) * 90 % 360 / 90) {
                    case 0:
                        $5.add($0.getRightCenter());
                        break;
                    case 1:
                        $5.add($0.getBottomCenter());
                        break;
                    case 2:
                        $5.add($0.getLeftCenter());
                        break;
                    case 3:
                        $5.add($0.getTopCenter());
                        break;
                    case 4:
                        $5.add($0.getRightCenter());
                        break;
                }
            }
            var $A = $3,
                $B = $4;
            for (var $D = 0; $D < $5.length; $D++) {
                if ($5[$D].x < $A.x) {
                    $A = new PerfectWidgets.Framework.DataObjects.Vector($5[$D].x, $A.y);
                }
                if ($5[$D].y < $A.y) {
                    $A = new PerfectWidgets.Framework.DataObjects.Vector($A.x, $5[$D].y);
                }
                if ($5[$D].x > $B.x) {
                    $B = new PerfectWidgets.Framework.DataObjects.Vector($5[$D].x, $B.y);
                }
                if ($5[$D].y > $B.y) {
                    $B = new PerfectWidgets.Framework.DataObjects.Vector($B.x, $5[$D].y);
                }
            }
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle($A.x, $A.y, $B.x - $A.x, $B.y - $A.y);
        },
        drawContent: function(painter, fill, stroke) {
            painter.drawGraphicsPath(fill, stroke, this.$25());
        },
        $25: function() {
            var $0 = this.getBounds().getLocation();
            var $1 = this.getSize();
            var $2 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($0.x, $0.y, $1.x, $1.y).getPositiveRectangle();
            var $3 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            $3.setBounds(this.getBounds());
            var $4 = new PerfectWidgets.Framework.DataObjects.Vector($2.width / 2, $2.height / 2);
            var $5 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint($2.getCenter(), $4, this.getStartAngle());
            $3.startPath($5);
            var $6 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            $6.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillParameters($2, this.getStartAngle(), this.getSweepAngle()));
            $3.addPathElement($6);
            return $3;
        }
    }
    PerfectWidgets.Model.BaseElements.ButtonBase = function() {
        PerfectWidgets.Model.BaseElements.ButtonBase.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ButtonBase.prototype = {
        on: false,
        getOn: function() {
            return this.on;
        },
        setOn: function(value) {
            if (value !== this.on) {
                this.on = value;
                this.refreshElement();
            }
        },
        $24: false,
        getPressed: function() {
            return this.$24;
        },
        setPressed: function(value) {
            if (value !== this.$24) {
                this.$24 = value;
                this.refreshElement();
            }
        },
        $25: false,
        getHot: function() {
            return this.$25;
        },
        setHot: function(value) {
            if (this.$25 !== value) {
                this.$25 = value;
                this.refreshElement();
            }
        }
    }
    PerfectWidgets.Model.BaseElements.Circle = function() {
        this.$23 = PerfectWidgets.Framework.DataObjects.Vector.empty;
        PerfectWidgets.Model.BaseElements.Circle.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Circle.prototype = {
        $24: 0,
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint() && Math.abs(this.$24) > 1) {
                this.setNeedRepaint(false);
                this.setSuffix('_circle');
                painter.createGroup();
                painter.clearGroup();
                painter.drawCircle(fill, stroke, this.$23, Math.abs(this.$24));
                painter.endGroup();
            }
        },
        getBoundedBox: function() {
            var $0 = this.$23;
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle($0.x - this.$24, $0.y - this.$24, 2 * this.$24, 2 * this.$24);
        },
        getHitTest: function(point) {
            var $0 = this.getRealPosition(point);
            if (this.getBoundedBox().contains($0)) {
                var $1 = $0.minus(this.$23);
                return $1.abs() <= this.$24;
            }
            return false;
        },
        getCenter: function() {
            return this.$23;
        },
        setCenter: function(value) {
            if (!this.$23.equals(value)) {
                this.$23 = value;
                this.setNeedRepaint(true);
            }
        },
        getRadius: function() {
            return this.$24;
        },
        setRadius: function(value) {
            if (value < 0) {
                new Error('throw PerpetuumSoft.Framework.ExceptionBuilder.ArgumentNegative("value");');
            }
            if (this.$24 !== value) {
                this.$24 = value;
                this.setNeedRepaint(true);
            }
        }
    }
    PerfectWidgets.Model.BaseElements.CircularNotches = function() {
        this.$24 = PerfectWidgets.Framework.Drawing.Color.lightBlue;
        this.$25 = PerfectWidgets.Framework.Drawing.Color.darkBlue;
        this.$27 = 0;
        PerfectWidgets.Model.BaseElements.CircularNotches.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.CircularNotches.prototype = {
        $23: 0,
        getLength: function() {
            return this.$23;
        },
        setLength: function(lengthValue) {
            if (lengthValue !== this.$23) {
                this.$23 = lengthValue;
                this.setNeedRepaint(true);
            }
        },
        getLightColor: function() {
            return this.$24;
        },
        setLightColor: function(lightColorValue) {
            this.$24 = lightColorValue;
            this.setNeedRepaint(true);
        },
        getDarkColor: function() {
            return this.$25;
        },
        setDarkColor: function(darkColorValue) {
            this.$25 = darkColorValue;
            this.setNeedRepaint(true);
        },
        $26: 0,
        getCount: function() {
            return this.$26;
        },
        setCount: function(countValue) {
            if (countValue < 0) {}
            if (this.$26 !== countValue) {
                this.$26 = countValue;
                this.setNeedRepaint(true);
            }
        },
        getNotchesStyle: function() {
            return this.$27;
        },
        setNotchesStyle: function(notchesStyleValue) {
            this.$27 = notchesStyleValue;
            this.setNeedRepaint(true);
        },
        $28: 0,
        getWidth: function() {
            return this.$28;
        },
        setWidth: function(widthValue) {
            this.$28 = widthValue;
            this.setNeedRepaint(true);
        },
        $29: function($p0) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $2 = this.getLightColor();
            var $3 = this.getDarkColor();
            if (this.getNotchesStyle() === 1) {
                $2 = this.getDarkColor();
                $3 = this.getLightColor();
            }
            var $4 = new PerfectWidgets.Framework.Drawing.Stroke();
            var $5 = new PerfectWidgets.Framework.Drawing.Stroke();
            $4.setStyle(PerfectWidgets.Framework.Drawing.LineStyle.solid);
            $4.setColor($2);
            $4.setWidth(this.getWidth());
            $5.setStyle(PerfectWidgets.Framework.Drawing.LineStyle.solid);
            $5.setColor($3);
            $5.setWidth(this.getWidth());
            var $6 = Math.PI * 2 / this.getCount();
            var $7 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getRadius() - this.getLength(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getAngle()));
            var $8 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getRadius(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getAngle()));
            $0.startPath(new PerfectWidgets.Framework.DataObjects.Vector(0, 0));
            $1.startPath(new PerfectWidgets.Framework.DataObjects.Vector(0, 0));
            for (var $9 = 0; $9 < this.getCount(); $9++) {
                var $A = this.getCenter().add($7);
                var $B = this.getCenter().add($8);
                if (this.getNotchesStyle() === 2) {
                    this.setSuffix('_' + $9.toString() + 'flat');
                    $p0.drawLine($5, [$A, $B]);
                } else {
                    var $C = $B.minus($A);
                    var $D = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getWidth() / 2, $C.getRotation() + PerfectWidgets.Framework.DataObjects.Vector.toRadians(90) + PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getAngle()));
                    if (Math.PI / 4 <= $C.getRotation() && $C.getRotation() <= Math.PI * 5 / 4) {
                        this.setSuffix('_' + $9.toString() + 'LLight');
                        $1.moveTo($A.add($D));
                        $1.addLine($B.add($D));
                    } else {
                        this.setSuffix('_' + $9.toString() + 'RDark');
                        $0.moveTo($A.add($D));
                        $0.addLine($B.add($D));
                    }
                    if (Math.PI / 4 <= $C.getRotation() && $C.getRotation() <= Math.PI * 5 / 4) {
                        this.setSuffix('_' + $9.toString() + 'LDark');
                        $0.moveTo($A.minus($D));
                        $0.addLine($B.minus($D));
                    } else {
                        this.setSuffix('_' + $9.toString() + 'RLight');
                        $1.moveTo($A.minus($D));
                        $1.addLine($B.minus($D));
                    }
                }
                $7.setRotation($7.getRotation() + $6);
                $8.setRotation($8.getRotation() + $6);
            }
            $0.terminate();
            $1.terminate();
            this.setSuffix('_' + 'darkPath');
            $p0.drawGraphicsPath(null, $5, $0);
            this.setSuffix('_' + 'lightPath');
            $p0.drawGraphicsPath(null, $4, $1);
        },
        onPaint: function(painter, fill, stroke) {
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                this.setSuffix('cnotches');
                painter.setContext(this);
                painter.createGroup();
                painter.clearGroup();
                this.$29(painter);
                painter.endGroup();
            }
        },
        getBoundedBox: function() {
            var $0 = new PerfectWidgets.Framework.DataObjects.Vector(this.getRadius() * 2, this.getRadius() * 2);
            var $1 = this.getCenter().minus($0.divideByNumber(2));
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle($1.x, $1.y, $0.x, $0.y);
        },
        getHitTest: function(point) {
            return PerfectWidgets.Model.BaseElements.CircularNotches.callBaseMethod(this, 'getHitTest', [point]);
        }
    }
    PerfectWidgets.Model.BaseElements.CircularShape = function() {
        this._center = PerfectWidgets.Framework.DataObjects.Vector.empty;
        PerfectWidgets.Model.BaseElements.CircularShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.CircularShape.prototype = {
        _radius: 0,
        _angle: 0,
        getCenter: function() {
            return this._center;
        },
        setCenter: function(value) {
            if (this._center !== value) {
                this._center = value;
                this.setNeedRepaint(true);
            }
        },
        getRadius: function() {
            return this._radius;
        },
        setRadius: function(value) {
            if (value < 0) {
                throw new Error('PerpetuumSoft.Framework.ExceptionBuilder.ArgumentNegative("value");');
            }
            if (this._radius !== value) {
                this._radius = value;
                this.setNeedRepaint(true);
            }
        },
        getAngle: function() {
            return this._angle;
        },
        setAngle: function(value) {
            value = Math.round(value % 360);
            if (this._angle !== value) {
                this._angle = value;
                this.setNeedRepaint(true);
            }
        }
    }
    PerfectWidgets.Model.BaseElements.Colorizer = function() {}
    PerfectWidgets.Model.BaseElements.DigitalText = function() {
        this.$25 = new PerfectWidgets.Framework.DataObjects.Vector(10, 10);
        this.$26 = new PerfectWidgets.Framework.DataObjects.Vector(2, 2);
        this.$28 = PerfectWidgets.Framework.Drawing.Color.lime;
        this.$29 = PerfectWidgets.Framework.Drawing.Color.darkSlateGray;
        PerfectWidgets.Model.BaseElements.DigitalText.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.DigitalText.prototype = {
        $23: null,
        $24: 'Digital Text',
        $27: null,
        $2A: false,
        $2B: 0,
        $2C: 0,
        getText: function() {
            return this.$24 + '';
        },
        setText: function(text) {
            if (this.$24 !== text) {
                this.$24 = text;
                this.$2E();
                this.setNeedRepaint(true);
            }
        },
        getSegmentSize: function() {
            return this.$25;
        },
        setSegmentSize: function(value) {
            if (this.$25 !== value) {
                this.$25 = value;
                this.setNeedRepaint(true);
            }
        },
        getSegmentSpaces: function() {
            return this.$26;
        },
        setSegmentSpaces: function(value) {
            if (this.$26 !== value) {
                this.$26 = value;
                this.setNeedRepaint(true);
            }
        },
        getFont: function() {
            return this.$27;
        },
        setFont: function(font) {
            if (font !== this.$27) {
                this.$27 = font;
                this.setNeedRepaint(true);
            }
        },
        resetFont: function() {
            this.setFont(null);
        },
        getActiveColor: function() {
            return this.$28;
        },
        setActiveColor: function(color) {
            if (this.$28 !== color) {
                this.$28 = color;
                this.setNeedRepaint(true);
            }
        },
        getInactiveColor: function() {
            return this.$29;
        },
        setInactiveColor: function(color) {
            if (color !== this.$29) {
                this.$29 = color;
                this.setNeedRepaint(true);
            }
        },
        getDigitalBackgroundVisible: function() {
            return this.$2A;
        },
        setDigitalBackgroundVisible: function(b) {
            if (this.$2A !== b) {
                this.$2A = b;
                this.setNeedRepaint(true);
            }
        },
        getTextVerticalOffset: function() {
            return this.$2B;
        },
        setTextVerticalOffset: function(offset) {
            if (this.$2B !== offset) {
                this.$2B = offset;
                this.setNeedRepaint(true);
            }
        },
        getTextHorizontalOffset: function() {
            return this.$2C;
        },
        setTextHorizontalOffset: function(offset) {
            if (this.$2C !== offset) {
                this.$2C = offset;
                this.setNeedRepaint(true);
            }
        },
        $2D: function($p0, $p1) {
            var $0 = this.getFont();
            var $1 = this.getText();
            if (this.$27 == null) {
                return;
            }
            var $2 = (2 * this.getSegmentSpaces().x + this.getSegmentSize().x);
            var $3 = (2 * this.getSegmentSpaces().y + this.getSegmentSize().y);
            var $4 = parseInt((this.getBounds().width / $2));
            var $5 = parseInt((this.getBounds().height / $3));
            var $6 = PerfectWidgets.Framework.Utilities.TextUtilities.insertMockDiv($0);
            var $7 = PerfectWidgets.Framework.Utilities.TextUtilities.measureText($1, $0, $6);
            PerfectWidgets.Framework.Utilities.TextUtilities.deleteMockDiv($6);
            var $8 = 2 * parseInt($7.y);
            var $9 = $8 * $1.length;
            if (this.$23 == null) {
                this.$23 = PerfectWidgets.Framework.Utilities.TextUtilities.rasterizeText(this.getFont(), this.getText(), new PerfectWidgets.Framework.DataObjects.Vector(this.getTextHorizontalOffset(), this.getTextVerticalOffset() + $7.y / 2), new PerfectWidgets.Framework.DataObjects.Vector($9, $8));
            }
            var $A = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $B = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            for (var $C = 0; $C < $4; $C++) {
                for (var $D = 0; $D < $5; $D++) {
                    var $E = $p1.x + $2 * $C + this.getSegmentSpaces().x;
                    var $F = $p1.y + $D * $3 + this.getSegmentSpaces().y;
                    var $10 = this.getSegmentSize().x;
                    var $11 = this.getSegmentSize().y;
                    var $12 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($E, $F, $10, $11);
                    if ($C >= this.getTextHorizontalOffset() && $C < $9 + this.getTextHorizontalOffset() && $D >= this.getTextVerticalOffset() && $D < $8 + this.getTextVerticalOffset()) {
                        var $13 = this.$23[(($D - this.getTextVerticalOffset()) * $9 + $C - this.getTextHorizontalOffset()) * 4 + 0];
                        if (!!$13) {
                            this.addRectangle($B, PerfectWidgets.Framework.Drawing.Unit.rectToPixel($12));
                        } else {
                            if (this.getDigitalBackgroundVisible()) {
                                this.addRectangle($A, PerfectWidgets.Framework.Drawing.Unit.rectToPixel($12));
                            }
                        }
                    } else {
                        if (this.getDigitalBackgroundVisible()) {
                            this.addRectangle($A, PerfectWidgets.Framework.Drawing.Unit.rectToPixel($12));
                        }
                    }
                }
            }
            this.setSuffix('backroundGrid');
            $p0.drawGraphicsPath(new PerfectWidgets.Framework.Drawing.SolidFill(this.$29), PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $A);
            this.setSuffix('textGrid');
            $p0.drawGraphicsPath(new PerfectWidgets.Framework.Drawing.SolidFill(this.$28), PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $B);
        },
        $2E: function() {
            this.$23 = null;
        },
        drawContent: function(painter, fill, stroke) {
            var $0 = this.getBounds();
            var $1 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($0.x, $0.y, $0.width, $0.height);
            var $2 = new PerfectWidgets.Framework.DataObjects.Vector($0.x, $0.y);
            var $3 = (2 * this.getSegmentSpaces().x + this.getSegmentSize().x);
            var $4 = (2 * this.getSegmentSpaces().y + this.getSegmentSize().y);
            var $5 = parseInt((this.getBounds().width / $3));
            var $6 = parseInt((this.getBounds().height / $4));
            var $7 = $2.x + this.getSegmentSpaces().x;
            var $8 = $2.y + this.getSegmentSpaces().y;
            var $9 = this.getSegmentSize().x;
            var $A = this.getSegmentSize().y;
            var $B = new PerfectWidgets.Framework.DataObjects.VectorRectangle($7, $8, $9, $A);
            painter.drawRectangle(fill, stroke, $1, 0);
            this.$2D(painter, $2);
        },
        addRectangle: function(path, rect) {
            var $0 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.moveTo);
            $0.add(rect.getTopLeft());
            path.addPathElement($0);
            var $1 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $1.add(rect.getTopRight());
            $1.add(rect.getBottomRight());
            $1.add(rect.getBottomLeft());
            $1.add(rect.getTopLeft());
            path.addPathElement($1);
        }
    }
    PerfectWidgets.Model.BaseElements.Frame = function() {
        this.$23 = PerfectWidgets.Framework.Drawing.Color.black;
        this.$24 = PerfectWidgets.Framework.Drawing.Color.black;
        this.$25 = PerfectWidgets.Framework.Drawing.Color.gray;
        this.$26 = PerfectWidgets.Framework.Drawing.Color.lightGray;
        this.$27 = 0;
        PerfectWidgets.Model.BaseElements.Frame.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Frame.prototype = {
        getInnerColor: function() {
            return this.$23;
        },
        setInnerColor: function(innerColorValue) {
            this.$23 = innerColorValue;
        },
        getOuterColor: function() {
            return this.$24;
        },
        setOuterColor: function(outerColorValue) {
            this.$24 = outerColorValue;
        },
        getDarkColor: function() {
            return this.$25;
        },
        setDarkColor: function(darkColorValue) {
            this.$25 = darkColorValue;
        },
        getLightColor: function() {
            return this.$26;
        },
        setLightColor: function(lightColorValue) {
            this.$26 = lightColorValue;
        },
        getBevelStyle: function() {
            return this.$27;
        },
        setBevelStyle: function(bevelStyleValue) {
            this.$27 = bevelStyleValue;
        },
        getFixedLineWidth: function() {
            return this.$28 * (2 + ((!this.getInnerColor().a()) ? 0 : 1) + ((!this.getOuterColor().a()) ? 0 : 1));
        },
        $28: 1,
        getLineWidth: function() {
            return this.$28;
        },
        setLineWidth: function(lineWidthValue) {
            this.$28 = lineWidthValue;
        },
        get_$29: function() {
            return this.getFixedLineWidth();
        },
        get_$2A: function() {
            return this.getFixedLineWidth();
        },
        get_$2B: function() {
            return this.getFixedLineWidth();
        },
        get_$2C: function() {
            return this.getFixedLineWidth();
        },
        drawContent: function(painter, fill, stroke) {
            this.setSuffix('frameModel');
            painter.setContext(this);
            var $0 = false;
            if (this.getInstrument() != null) {
                $0 = this.getInstrument().getIsFocused();
            }
            if (this.getFill() != null) {
                this.setSuffix('_Filled');
                painter.drawRectangle(fill, stroke, this.getBounds(), 0);
            }
            this.$2D(painter);
        },
        $2D: function($p0) {
            if (!!this.getBevelStyle()) {
                var $0 = this.getBounds();
                $0.width -= this.get_$2B();
                $0.height -= this.get_$2C();
                var $1 = new PerfectWidgets.Framework.DataObjects.Vector(PerfectWidgets.Framework.Drawing.Unit.pixel.k * this.getLineWidth(), PerfectWidgets.Framework.Drawing.Unit.pixel.k * this.getLineWidth());
                var $2 = $0.getTopLeft();
                var $3 = $0.getBottomRight();
                var $4 = this.$2E(PerfectWidgets.Framework.Drawing.LineStyle.solid, this.getLightColor(), PerfectWidgets.Framework.Drawing.Unit.pixel.k * this.getLineWidth());
                var $5 = this.$2E(PerfectWidgets.Framework.Drawing.LineStyle.solid, this.getDarkColor(), PerfectWidgets.Framework.Drawing.Unit.pixel.k * this.getLineWidth());
                var $6 = this.$2E(PerfectWidgets.Framework.Drawing.LineStyle.solid, this.getInnerColor(), PerfectWidgets.Framework.Drawing.Unit.pixel.k * this.getLineWidth());
                var $7 = this.$2E(PerfectWidgets.Framework.Drawing.LineStyle.solid, this.getOuterColor(), PerfectWidgets.Framework.Drawing.Unit.pixel.k * this.getLineWidth());
                if (!!this.getOuterColor().a()) {
                    this.setSuffix('_OuterBorder');
                    $2 = $2.add($1);
                    $3 = $3.minus($1);
                }
                switch (this.getBevelStyle()) {
                    case 1:
                        $6 = $5;
                        $7 = $5;
                        break;
                    case 2:
                    case 3:
                        break;
                    case 5:
                    case 7:
                    case 9:
                        $6 = $5;
                        $7 = $4;
                        break;
                    case 4:
                    case 6:
                    case 8:
                        $6 = $4;
                        $7 = $5;
                        break;
                }
                this.setSuffix('_pUp11');
                $p0.drawLine($6, [new PerfectWidgets.Framework.DataObjects.Vector($2.x, $2.y), new PerfectWidgets.Framework.DataObjects.Vector($2.x, $3.y)]);
                this.setSuffix('_pUp12');
                $p0.drawLine($6, [new PerfectWidgets.Framework.DataObjects.Vector($2.x, $2.y), new PerfectWidgets.Framework.DataObjects.Vector($3.x, $2.y)]);
                this.setSuffix('_pDown11');
                $p0.drawLine($7, [new PerfectWidgets.Framework.DataObjects.Vector($2.x, $3.y), new PerfectWidgets.Framework.DataObjects.Vector($3.x, $3.y)]);
                this.setSuffix('_pDown12');
                $p0.drawLine($7, [new PerfectWidgets.Framework.DataObjects.Vector($3.x, $2.y), new PerfectWidgets.Framework.DataObjects.Vector($3.x, $3.y)]);
                if (this.getBevelStyle() === 3 || this.getBevelStyle() === 6 || this.getBevelStyle() === 7 || this.getBevelStyle() === 9 || this.getBevelStyle() === 8) {
                    if (this.getBevelStyle() === 9 || this.getBevelStyle() === 8) {
                        var $8 = $6;
                        $6 = $7;
                        $7 = $8;
                    }
                    $2 = $2.add($1);
                    $3 = $3.minus($1);
                    this.setSuffix('_pUp21');
                    $p0.drawLine($6, [new PerfectWidgets.Framework.DataObjects.Vector($2.x, $2.y), new PerfectWidgets.Framework.DataObjects.Vector($2.x, $3.y)]);
                    this.setSuffix('_pUp22');
                    $p0.drawLine($6, [new PerfectWidgets.Framework.DataObjects.Vector($2.x, $2.y), new PerfectWidgets.Framework.DataObjects.Vector($3.x, $2.y)]);
                    this.setSuffix('_pDown21');
                    $p0.drawLine($7, [new PerfectWidgets.Framework.DataObjects.Vector($2.x, $3.y), new PerfectWidgets.Framework.DataObjects.Vector($3.x, $3.y)]);
                    this.setSuffix('_pDown22');
                    $p0.drawLine($7, [new PerfectWidgets.Framework.DataObjects.Vector($3.x, $2.y), new PerfectWidgets.Framework.DataObjects.Vector($3.x, $3.y)]);
                }
                if (!!this.getInnerColor().a()) {
                    this.setSuffix('_InnerBorder');
                    var $9 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($2.x + PerfectWidgets.Framework.Drawing.Unit.pixel.k * this.getLineWidth(), $2.y + PerfectWidgets.Framework.Drawing.Unit.pixel.k * this.getLineWidth(), $3.x - $2.x - PerfectWidgets.Framework.Drawing.Unit.pixel.k * 2 * this.getLineWidth(), $3.y - $2.y - PerfectWidgets.Framework.Drawing.Unit.pixel.k * 2 * this.getLineWidth());
                }
            }
        },
        $2E: function($p0, $p1, $p2) {
            var $0 = new PerfectWidgets.Framework.Drawing.Stroke();
            $0.setStyle($p0);
            $0.setColor($p1);
            $0.setWidth($p2);
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.Group = function() {
        PerfectWidgets.Model.BaseElements.Group.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.LinearNotches = function() {
        this.$24 = PerfectWidgets.Framework.Drawing.Color.lightBlue;
        this.$25 = PerfectWidgets.Framework.Drawing.Color.darkBlue;
        this.$27 = 0;
        PerfectWidgets.Model.BaseElements.LinearNotches.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.LinearNotches.prototype = {
        $23: 0,
        getLength: function() {
            return this.$23;
        },
        setLength: function(lengthValue) {
            if (this.$23 !== lengthValue) {
                this.$23 = lengthValue;
                this.setNeedRepaint(true);
            }
        },
        getLightColor: function() {
            return this.$24;
        },
        setLightColor: function(lightColorValue) {
            this.$24 = lightColorValue;
            this.setNeedRepaint(true);
        },
        getDarkColor: function() {
            return this.$25;
        },
        setDarkColor: function(darkColorValue) {
            this.$25 = darkColorValue;
            this.setNeedRepaint(true);
        },
        $26: 0,
        getCount: function() {
            return this.$26;
        },
        setCount: function(countValue) {
            if (countValue < 0) {}
            if (this.$26 !== countValue) {
                this.$26 = countValue;
                this.setNeedRepaint(true);
            }
        },
        getNotchesStyle: function() {
            return this.$27;
        },
        setNotchesStyle: function(notchesStyleValue) {
            this.$27 = notchesStyleValue;
            this.setNeedRepaint(true);
        },
        $28: 0,
        getWidth: function() {
            return this.$28;
        },
        setWidth: function(widthValue) {
            this.$28 = widthValue;
            this.setNeedRepaint(true);
        },
        $29: function() {
            return this.getEndPoint().minus(this.getStartPoint()).getRotation() + PerfectWidgets.Framework.DataObjects.Vector.toRadians(90);
        },
        onPaint: function(painter, fill, stroke) {
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                this.setSuffix('lnotches');
                painter.setContext(this);
                painter.createGroup();
                this.$2A(painter);
                painter.endGroup();
            }
        },
        $2A: function($p0) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $2 = this.getEndPoint();
            var $3 = this.getStartPoint();
            var $4 = this.getLightColor();
            var $5 = this.getDarkColor();
            var $6 = $2.minus($3);
            switch (this.getNotchesStyle()) {
                case 0:
                    if (Math.PI / 4 <= $6.getRotation() && $6.getRotation() <= Math.PI * 5 / 4) {
                        $5 = this.getLightColor();
                        $4 = this.getDarkColor();
                    } else {
                        $4 = this.getLightColor();
                        $5 = this.getDarkColor();
                    }
                    break;
                case 1:
                    if (Math.PI / 4 <= $6.getRotation() && $6.getRotation() <= Math.PI * 5 / 4) {
                        $4 = this.getLightColor();
                        $5 = this.getDarkColor();
                    } else {
                        $5 = this.getLightColor();
                        $4 = this.getDarkColor();
                    }
                    break;
            }
            var $7 = new PerfectWidgets.Framework.Drawing.Stroke();
            var $8 = new PerfectWidgets.Framework.Drawing.Stroke();
            $7.setStyle(PerfectWidgets.Framework.Drawing.LineStyle.solid);
            $7.setColor($4);
            $7.setWidth(1.5);
            $8.setStyle(PerfectWidgets.Framework.Drawing.LineStyle.solid);
            $8.setColor($5);
            $8.setWidth(1.5);
            $0.startPath(new PerfectWidgets.Framework.DataObjects.Vector(0, 0));
            $1.startPath(new PerfectWidgets.Framework.DataObjects.Vector(0, 0));
            var $9 = this.getWidth() / this.getCount();
            for (var $A = 0; $A < this.getCount(); $A++) {
                var $B = $3;
                $B = $B.minus(PerfectWidgets.Framework.DataObjects.Vector.fromPolar($9 * $A, this.$29()));
                $B = $B.add(PerfectWidgets.Framework.DataObjects.Vector.fromPolar((this.getWidth() - $9) / 2 - $7.getWidth() / 2, this.$29()));
                var $C = $2;
                $C = $C.minus(PerfectWidgets.Framework.DataObjects.Vector.fromPolar($9 * $A, this.$29()));
                $C = $C.add(PerfectWidgets.Framework.DataObjects.Vector.fromPolar((this.getWidth() - $9) / 2 - $7.getWidth() / 2, this.$29()));
                this.setSuffix('_' + $A.toString() + 'light');
                $1.moveTo($B);
                $1.addLine($C);
                $B = $3;
                $B = $B.minus(PerfectWidgets.Framework.DataObjects.Vector.fromPolar($9 * $A, this.$29()));
                $B = $B.add(PerfectWidgets.Framework.DataObjects.Vector.fromPolar((this.getWidth() - $9) / 2 + $8.getWidth() / 2, this.$29()));
                $C = $2;
                $C = $C.minus(PerfectWidgets.Framework.DataObjects.Vector.fromPolar($9 * $A, this.$29()));
                $C = $C.add(PerfectWidgets.Framework.DataObjects.Vector.fromPolar((this.getWidth() - $9) / 2 + $8.getWidth() / 2, this.$29()));
                this.setSuffix('_' + $A.toString() + 'dark');
                $0.moveTo($B);
                $0.addLine($C);
            }
            $0.terminate();
            $1.terminate();
            this.setSuffix('_' + 'darkPath');
            $p0.drawGraphicsPath(null, $8, $0);
            this.setSuffix('_' + 'lightPath');
            $p0.drawGraphicsPath(null, $7, $1);
        },
        getHitTest: function(point) {
            var $0 = this.getEndPoint();
            var $1 = this.getStartPoint();
            var $2 = PerfectWidgets.Framework.DataObjects.Vector.toRadians(90) - $0.minus($1).getRotation();
            var $3 = PerfectWidgets.Framework.Geometry.GeometryUtilities.rotateVector(point, $0, $2);
            var $4 = PerfectWidgets.Framework.Geometry.GeometryUtilities.rotateVector($1, $0, $2);
            var $5 = $0.minus($1).getLength();
            return (((Math.abs($3.y - $4.y) <= $5) && (Math.abs($3.y - $0.y) <= $5)) && (($3.x >= $0.x - this.getWidth() / 2) && ($3.x <= $0.x + this.getWidth() / 2)));
        },
        getBoundedBox: function() {
            var $0 = this.getEndPoint();
            var $1 = this.getStartPoint();
            var $2 = $0.minus($1);
            var $3 = $2.getPerpendicular();
            $3.setLength(this.getWidth() / 2);
            return PerfectWidgets.Framework.Geometry.GeometryUtilities.getPolygonBox([$1.add($3), $1.minus($3), $0.minus($3), $0.minus($3)]);
        }
    }
    PerfectWidgets.Model.BaseElements.Odometer = function() {
        PerfectWidgets.Model.BaseElements.Odometer.initializeBase(this);
        this.$29 = this.$23();
        this.$28 = this.$25();
        this.$27 = this.$26();
        this.$2A = this.$24();
    }
    PerfectWidgets.Model.BaseElements.Odometer.prototype = {
        $23: function() {
            var $0 = new PerfectWidgets.Framework.Drawing.MultiGradientFill();
            $0.setAngle(90);
            var $1 = new PerfectWidgets.Framework.Drawing.GradientColorCollection();
            $1.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(0, 32, 32, 32), 0));
            $1.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.white, 0.5));
            $1.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(0, 32, 32, 32), 1));
            return $0;
        },
        $24: function() {
            return new PerfectWidgets.Framework.Drawing.SolidFill(PerfectWidgets.Framework.Drawing.Color.black);
        },
        $25: function() {
            var $0 = new PerfectWidgets.Framework.Drawing.MultiGradientFill();
            $0.setAngle(90);
            var $1 = new PerfectWidgets.Framework.Drawing.GradientColorCollection();
            $1.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.red, 0));
            $1.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(0, 255, 255, 192), 0.5));
            $1.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.red, 1));
            return $0;
        },
        $26: function() {
            return new PerfectWidgets.Framework.Drawing.SolidFill(PerfectWidgets.Framework.Drawing.Color.blue);
        },
        $27: null,
        $28: null,
        $29: null,
        $2A: null,
        $2B: null,
        $2C: 123,
        getFirstDigitForeFill: function() {
            return this.$27;
        },
        setFirstDigitForeFill: function(fill) {
            this.$27 = fill;
            this.setNeedRepaint(true);
        },
        getFirstDigitBackFill: function() {
            return this.$28;
        },
        setFirstDigitBackFill: function(fill) {
            this.$28 = fill;
            this.setNeedRepaint(true);
        },
        getBackFill: function() {
            return this.$29;
        },
        setBackFill: function(fill) {
            this.$29 = fill;
            this.setNeedRepaint(true);
        },
        getForeFill: function() {
            return this.$2A;
        },
        setForeFill: function(fill) {
            this.$2A = fill;
            this.setNeedRepaint(true);
        },
        getFont: function() {
            return this.$2B;
        },
        setFont: function(font) {
            this.$2B = font;
            this.setNeedRepaint(true);
        },
        resetFont: function() {
            this.$2B = null;
        },
        getValue: function() {
            return this.$2C;
        },
        setValue: function(value) {
            if (this.$2C !== value) {
                this.$2C = value;
                this.setNeedRepaint(true);
            }
        },
        $2D: function($p0, $p1, $p2, $p3, $p4, $p5, $p6) {
            if (this.$2B != null) {
                this.setSuffix($p6);
                $p0.startClip($p1);
                this.setSuffix('.rectangle.' + $p6);
                $p0.drawRectangle($p2, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $p1, 0);
                var $0 = ($p4 === '9') ? 0 : parseInt($p4) + 1;
                var $1;
                var $2 = PerfectWidgets.Framework.Utilities.TextUtilities.insertMockDiv(this.getFont());
                var $3 = PerfectWidgets.Framework.Drawing.Unit.pixelToInternal(PerfectWidgets.Framework.Utilities.TextUtilities.measureText('8', this.getFont(), $2).y);
                PerfectWidgets.Framework.Utilities.TextUtilities.deleteMockDiv($2);
                $1 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($p1.x, $p1.y, $p1.width, $p1.height);
                $1.y += $3 - ($3 * $p5);
                $p1.y -= parseInt(($3 * $p5));
                this.setSuffix('.digit.' + $p6);
                $p0.drawAlignedText($p4, this.getFont(), $p3, $p1, 0, PerfectWidgets.Framework.Drawing.ContentAlignment.middleCenter);
                if (!!$p5) {
                    this.setSuffix('.delta.' + $p6);
                    $p0.drawAlignedText($0.toString(), this.getFont(), $p3, $1, 0, PerfectWidgets.Framework.Drawing.ContentAlignment.middleCenter);
                } else {
                    this.setSuffix('.delta.' + $p6);
                    $p0.drawAlignedText('', this.getFont(), $p3, $1, 0, PerfectWidgets.Framework.Drawing.ContentAlignment.middleCenter);
                }
                $p0.endClip();
            }
        },
        $2E: function($p0) {
            var $0 = this.getBounds();
            var $1 = PerfectWidgets.Framework.Drawing.Unit.vectorToInternal(new PerfectWidgets.Framework.DataObjects.Vector(28, 60));
            if (this.$2B != null) {
                var $5 = PerfectWidgets.Framework.Utilities.TextUtilities.insertMockDiv(this.getFont());
                $1 = PerfectWidgets.Framework.Drawing.Unit.vectorToInternal(PerfectWidgets.Framework.Utilities.TextUtilities.measureText('8', this.getFont(), $5));
                PerfectWidgets.Framework.Utilities.TextUtilities.deleteMockDiv($5);
            }
            var $2 = parseInt(($0.width / ($1.x + 2)));
            var $3 = new Array($2);
            var $4 = this.$2F($2);
            for (var $6 = 0; $6 < $2; $6++) {
                $3[$6] = $4.charAt($6);
            }
            for (var $7 = 0; $7 < $2; $7++) {
                var $8 = $2 - $7 - 1;
                var $9 = $3[$8];
                var $A = new PerfectWidgets.Framework.DataObjects.VectorRectangle($0.x + $0.width - ($7 + 1) * ($1.x + 2), $0.y, $1.x, $0.height);
                var $B = 0;
                if (!$7) {
                    $B = this.$2C - Math.floor(this.$2C);
                } else {
                    var $E = true;
                    for (var $F = $8 + 1; $F <= $2 - 1; $F++) {
                        if ($3[$F].toString() !== '9') {
                            $E = false;
                            break;
                        }
                    }
                    if ($E) {
                        $B = this.$2C - Math.floor(this.$2C);
                    }
                }
                var $C = (!$7) ? this.getFirstDigitBackFill() : this.getBackFill();
                var $D = (!$7) ? this.getFirstDigitForeFill() : this.getForeFill();
                this.$2D($p0, $A, $C, $D, $9.toString(), $B, $7.toString());
            }
        },
        $2F: function($p0) {
            var $0 = $p0 - Math.floor(this.getValue()).toString().length;
            var $1 = Math.floor(this.getValue()).toString();
            var $2 = new ss.StringBuilder();
            for (var $3 = 0; $3 < $0; $3++) {
                $2.append('0');
            }
            $2.append($1);
            return $2.toString();
        },
        drawContent: function(painter, fill, stroke) {
            PerfectWidgets.Model.BaseElements.Odometer.callBaseMethod(this, 'drawContent', [painter, fill, stroke]);
            var $0 = this.getBounds();
            painter.drawRectangle(fill, stroke, $0, 0);
            this.$2E(painter);
        }
    }
    PerfectWidgets.Model.BaseElements.Digits = function() {
        this.$2A = PerfectWidgets.Framework.Drawing.Color.lime;
        this.$2B = PerfectWidgets.Framework.Drawing.Color.darkSlateGray;
        PerfectWidgets.Model.BaseElements.Digits.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Digits.prototype = {
        $23: null,
        getText: function() {
            return (this.$23 + '');
        },
        setText: function(textValue) {
            if (textValue !== this.$23) {
                this.$23 = textValue + '';
                this.setNeedRepaint(true);
            }
        },
        $24: null,
        getDigitPainter: function() {
            if (this.$24 == null) {
                this.$24 = new PerfectWidgets.Model.Drawing.GeneralDigitStyle(this);
            }
            return this.$24;
        },
        setDigitPainter: function(digitPainterValue) {
            if (this.$24 !== digitPainterValue) {
                this.$24 = digitPainterValue;
                this.setNeedRepaint(true);
            }
        },
        $25: 100,
        getDigitWidth: function() {
            return this.$25;
        },
        setDigitWidth: function(digitWidthValue) {
            if (this.$25 !== digitWidthValue) {
                this.$25 = digitWidthValue;
                this.setNeedRepaint(true);
            }
        },
        $26: 200,
        getDigitHeight: function() {
            return this.$26;
        },
        setDigitHeight: function(digitHeightValue) {
            if (this.$26 !== digitHeightValue) {
                this.$26 = digitHeightValue;
                this.setNeedRepaint(true);
            }
        },
        $27: 30,
        getDigitSpace: function() {
            return this.$27;
        },
        setDigitSpace: function(digitSpaceValue) {
            if (this.$27 !== digitSpaceValue) {
                this.$27 = digitSpaceValue;
                this.setNeedRepaint(true);
            }
        },
        $28: 20,
        getSegmentThickness: function() {
            return this.$28;
        },
        setSegmentThickness: function(segmentThicknessValue) {
            if (this.$28 !== segmentThicknessValue) {
                this.$28 = segmentThicknessValue;
                this.setNeedRepaint(true);
            }
        },
        $29: 0,
        getSegmentSpace: function() {
            return this.$29;
        },
        setSegmentSpace: function(segmentSpaceValue) {
            if (this.$29 !== segmentSpaceValue) {
                this.$29 = segmentSpaceValue;
                this.setNeedRepaint(true);
            }
        },
        getActiveColor: function() {
            return this.$2A;
        },
        setActiveColor: function(activeColorValue) {
            if (this.$2A !== activeColorValue) {
                this.$2A = activeColorValue;
                this.setNeedRepaint(true);
            }
        },
        getInactiveColor: function() {
            return this.$2B;
        },
        setInactiveColor: function(inactiveColorValue) {
            if (this.$2B !== inactiveColorValue) {
                this.$2B = inactiveColorValue;
                this.setNeedRepaint(true);
            }
        },
        $2C: 0.1,
        getOverhang: function() {
            return this.$2C;
        },
        setOverhang: function(overhangValue) {
            if (this.$2C !== overhangValue) {
                this.$2C = overhangValue;
                this.setNeedRepaint(true);
            }
        },
        $2D: 0.25,
        getSkew: function() {
            return this.$2D;
        },
        setSkew: function(skewValue) {
            if (this.$2D !== skewValue) {
                this.$2D = skewValue;
                this.setNeedRepaint(true);
            }
        },
        $2E: 0,
        getStyleID: function() {
            return this.$2E;
        },
        setStyleID: function(styleIDValue) {
            this.$2E = styleIDValue;
        },
        $31: function($p0, $p1, $p2) {
            if (($p2 == null) || (!$p2)) {
                return;
            }
            this.setSuffix('digits_elems');
            var $0 = this.getDigitPainter();
            $0.prepareSegmentsIfNeeded();
            var $1 = new PerfectWidgets.Framework.Drawing.SolidFill(this.getActiveColor());
            var $2 = new PerfectWidgets.Framework.Drawing.SolidFill(this.getInactiveColor());
            var $3 = $p1;
            var $4 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $5 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            $4.startPath(this.getCenter());
            $5.startPath(this.getCenter());
            for (var $6 = 0; $6 < $p2.length; $6++) {
                var $7 = $p2.substr($6, 1);
                if (Object.keyExists(PerfectWidgets.Model.BaseElements.Digits.$2F, $7)) {
                    this.setSuffix('segments_' + $6.toString());
                    $0.formSegments($4, $5, PerfectWidgets.Model.BaseElements.Digits.$2F[$7], $3);
                    $3 = new PerfectWidgets.Framework.DataObjects.Vector($3.x + this.getDigitSpace() + this.getDigitWidth(), $3.y);
                } else if ($7 === ':') {
                    this.setSuffix('colon_' + $6.toString());
                    this.getDigitPainter().formColon($4, $3);
                    $3 = new PerfectWidgets.Framework.DataObjects.Vector($3.x + this.getDigitSpace() + this.getSegmentThickness(), $3.y);
                } else if ($7 === '.' || $7 === ',') {
                    this.setSuffix('dot_' + $6.toString());
                    this.setSuffix('dot_' + $6.toString() + '_0');
                    this.getDigitPainter().formDot($4, $3);
                    $3 = new PerfectWidgets.Framework.DataObjects.Vector($3.x + this.getDigitSpace() + this.getSegmentThickness(), $3.y);
                }
            }
            $4.terminate();
            $5.terminate();
            this.setSuffix('_act');
            $p0.drawGraphicsPath($1, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $4);
            this.setSuffix('_inact');
            $p0.drawGraphicsPath($2, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $5);
        },
        drawContent: function(painter, fill, stroke) {
            painter.setContext(this);
            painter.clearGroup();
            painter.startClip(this.getBounds());
            this.setSuffix('digits_back');
            painter.drawRectangle(fill, stroke, this.getBounds(), 0);
            var $0 = this.getBounds();
            var $1 = new PerfectWidgets.Framework.DataObjects.Vector($0.getLeft() + 5, $0.getTop() + $0.height / 2 - this.getDigitHeight() / 2);
            painter.drawRectangle(fill, stroke, $0, 0);
            this.setSuffix('digits_back');
            this.$31(painter, $1, this.getText());
            painter.endClip();
        }
    }
    PerfectWidgets.Model.BaseElements.PushButton = function() {
        PerfectWidgets.Model.BaseElements.PushButton.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.PushButton.prototype = {
        onMouseUp: function(args) {
            if (this.getOn()) {
                this.setOn(false);
            } else {
                this.setOn(true);
            }
            this.setPressed(false);
            this.refreshElement();
            PerfectWidgets.Model.BaseElements.PushButton.callBaseMethod(this, 'onMouseUp', [args]);
        },
        onMouseDown: function(args) {
            this.setPressed(true);
            this.refreshElement();
            PerfectWidgets.Model.BaseElements.PushButton.callBaseMethod(this, 'onMouseDown', [args]);
        },
        onMouseEnter: function(args) {
            this.setHot(true);
            this.refreshElement();
            PerfectWidgets.Model.BaseElements.PushButton.callBaseMethod(this, 'onMouseEnter', [args]);
        },
        onMouseLeave: function(args) {
            this.setHot(false);
            this.refreshElement();
            PerfectWidgets.Model.BaseElements.PushButton.callBaseMethod(this, 'onMouseLeave', [args]);
        }
    }
    PerfectWidgets.Model.BaseElements.RangedLevel = function() {
        PerfectWidgets.Model.BaseElements.RangedLevel.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.RangedLevel.prototype = {
        $29: 0.01,
        $2A: 500,
        $2B: 50,
        $2C: 0,
        getAlignmentMode: function() {
            return this.$2C;
        },
        setAlignmentMode: function(AlignmentModeValue) {
            this.$2C = AlignmentModeValue;
            this.setNeedRepaint(true);
        },
        $2D: 0,
        getStartWidth: function() {
            return this.$2D;
        },
        setStartWidth: function(startWidthValue) {
            this.$2D = startWidthValue;
            this.setNeedRepaint(true);
        },
        $2E: 0,
        getEndWidth: function() {
            return this.$2E;
        },
        setEndWidth: function(endWidthValue) {
            if (this.$2E !== endWidthValue) {
                this.$2E = endWidthValue;
                this.setNeedRepaint(true);
            }
        },
        getSize: function() {
            return Math.max(Math.abs(this.getStartWidth()), Math.abs(this.getEndWidth()));
        },
        $2F: function() {
            var $0 = this.$2B;
            var $1 = Math.max(this.$2A, this.getDistance());
            var $2 = Math.min(this.$2A, this.getDistance());
            if (Math.abs($2) < this.$29) {
                return $0;
            }
            return Math.floor(Math.abs($0 * $1 / $2));
        },
        $30: function($p0, $p1, $p2, $p3, $p4, $p5) {
            switch (this.getAlignmentMode()) {
                case 0:
                    return ($p1 === 1) ? this.getDistance() : this.getDistance() + this.$31($p2, $p3, $p4, $p5, $p0);
                case 2:
                    return this.getDistance() + this.$31($p2, $p3, $p4, $p5, $p0) * $p1 / 2;
                case 1:
                    return ($p1 === -1) ? this.getDistance() : this.getDistance() - this.$31($p2, $p3, $p4, $p5, $p0);
            }
            return this.getDistance();
        },
        $31: function($p0, $p1, $p2, $p3, $p4) {
            return $p1 + ($p4 - $p0) / ($p2 - $p0) * ($p3 - $p1);
        },
        $32: function($p0, $p1, $p2, $p3, $p4, $p5, $p6, $p7) {
            var $0 = $p1 + $p5 * $p6;
            var $1 = this.$30($0, $p7, $p1, $p2, $p3, $p4);
            return $p0.valueToPoint($0, $1);
        },
        $33: function($p0, $p1, $p2, $p3, $p4) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = this.$38();
            if (Type.canCast($1, PerfectWidgets.Model.BaseElements.Joint) && $p3 === $p4) {
                var $7 = $1;
                var $8 = this.$30($p1, 1, $p1, this.getStartWidth(), $p2, this.getEndWidth());
                var $9 = $p0.valueToPoint($p1, $8);
                var $A = $p0.valueToPoint($p2, $8);
                $0.startPath($9);
                var $B = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
                var $C = $7.getStartAngle() + $7.getTotalAngle() * this.getScale().valueToPercent($p1);
                var $D = $7.getStartAngle() + $7.getTotalAngle() * this.getScale().valueToPercent($p2);
                $B.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillLowLevelParameters($8, $8, $A, $C, $D - $C, PerfectWidgets.Framework.Transformation.AbstractTransformation.noTrasformation));
                $0.addPathElement($B);
                var $E = this.$30($p2, -1, $p1, this.getStartWidth(), $p2, this.getEndWidth());
                var $F = $p0.valueToPoint($p2, $E);
                $0.addLine($F);
                $8 = this.$30($p1, -1, $p1, this.getStartWidth(), $p2, this.getEndWidth());
                var $10 = $p0.valueToPoint($p1, $8);
                $B = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
                $B.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillLowLevelParameters($8, $8, $10, $D, $C - $D, PerfectWidgets.Framework.Transformation.AbstractTransformation.noTrasformation));
                $0.addPathElement($B);
                $0.terminate();
                $0.setBounds(this.getBoundedBox());
                return $0;
            }
            if (Type.canCast($1, PerfectWidgets.Model.BaseElements.Guide)) {
                var $11 = $1;
                var $12 = 0;
                var $13 = this.getValue();
                if (!$13.getKind()) {
                    if (!$13.getValue()) {
                        $12 = this.getMaxValue();
                    }
                } else if ($13.getKind() === 1) {
                    $12 = $13.getValue();
                } else if ($13.getKind() === 2) {
                    $12 = $13.getValue() * 0.01 * this.getMaxValue();
                } else {
                    $12 = this.getMaxValue() * 0.5;
                }
                var $14 = this.getMinValue();
                var $15 = this.getMaxValue();
                var $16 = $12 / ($15 - $14);
                var $17 = this.$30($p1, 1, $p1, this.getStartWidth(), $p2, this.getEndWidth());
                var $18 = $p0.valueToPoint($p1, $17);
                var $19 = this.$30($16 * ($p2 - $p1) + $p1, 1, $p1, this.getStartWidth(), $p2, this.getEndWidth());
                var $1A = $p0.valueToPoint($p2, $19);
                var $1B = this.$30($16 * ($p2 - $p1) + $p1, -1, $p1, this.getStartWidth(), $p2, this.getEndWidth());
                var $1C = $p0.valueToPoint($p2, $1B);
                var $1D = this.$30($p1, -1, $p1, this.getStartWidth(), $p2, this.getEndWidth());
                var $1E = $p0.valueToPoint($p1, $1D);
                $0.startPath($18);
                $0.addLine($1A);
                $0.addLine($1C);
                $0.addLine($1E);
                $0.terminate();
                $0.setBounds(this.getBoundedBox());
                return $0;
            }
            var $2 = Math.floor(this.$2F());
            var $3 = ($p2 - $p1) / ($2 - 1);
            var $4 = new Array($2);
            var $5 = ($p4 - $p3) / ($2 - 1);
            for (var $1F = 0; $1F < $2; $1F++) {
                $4[$1F] = PerfectWidgets.Framework.Drawing.Unit.vectorToPixel(this.$32($p0, $p1, $p3, $p2, $p4, $3, $1F, 1));
            }
            $0.startPath(this.$32($p0, $p1, $p3, $p2, $p4, $3, 0, -1));
            var $6 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $6.addRange($4);
            $0.addPathElement($6);
            for (var $20 = $2 - 1; $20 >= 0; $20--) {
                $4[$2 - 1 - $20] = PerfectWidgets.Framework.Drawing.Unit.vectorToPixel(this.$32($p0, $p1, $p3, $p2, $p4, $3, $20, -1));
            }
            $6 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $6.addRange($4);
            $0.addPathElement($6);
            $0.setBounds(this.getBoundedBox());
            $0.terminate();
            return $0;
        },
        getHitTest: function(point) {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = this.getStartWidth();
                var $2 = this.getEndWidth();
                var $3 = this.getDistance();
                var $4 = this.getMinValue();
                var $5 = this.getMaxValue();
                var $6 = Type.safeCast($0.getParent(), PerfectWidgets.Model.BaseElements.Joint);
                if ($6 != null) {
                    var $7 = $0.pointToValue(point);
                    var $8 = this.getSmartValue(this.getValue(), $5);
                    if ($7 > $8) {
                        return false;
                    }
                    var $9 = $1;
                    if ($1 !== $2) {
                        var $10 = ($2 - $1) / ($5 - $4);
                        $9 = $10 * $7 + $1;
                    }
                    var $A = $0.valueToPoint($7, $3);
                    var $B = $0.valueToPoint($7, $3 + $9);
                    var $C = $6.getCenter();
                    var $D = $A.minus($C).getLength();
                    var $E = $B.minus($C).getLength();
                    var $F = point.minus($C).getLength();
                    return Math.min($D, $E) <= $F && Math.max($D, $E) >= $F;
                } else {
                    var $11 = Type.safeCast($0.getParent(), PerfectWidgets.Model.BaseElements.Guide);
                    if ($11 != null) {
                        var $12 = this.getSmartValue(this.getValue(), $5);
                        var $13 = $1;
                        if ($1 !== $2) {
                            var $16 = ($2 - $1) / ($5 - $4);
                            $13 = $16 * $12 + $1;
                        }
                        var $14 = new Array(4);
                        var $15 = $0.valueToPoint($12, $3);
                        $14[0] = $0.valueToPoint($4, $3);
                        $14[1] = $0.valueToPoint($4, $3 + $1);
                        $14[2] = $0.valueToPoint($12, $3 + $13);
                        $14[3] = $0.valueToPoint($12, $3);
                        return PerfectWidgets.Framework.Geometry.GeometryUtilities.isIncludePoint($14, point);
                    }
                }
            }
            return PerfectWidgets.Model.BaseElements.RangedLevel.callBaseMethod(this, 'getHitTest', [point]);
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                painter.createGroup();
                var $0 = this.getScale();
                if ($0 != null) {
                    var $1 = this.getMinValue();
                    var $2 = this.getMaxValue();
                    var $3 = this.getSmartValue(this.getValue(), $2);
                    if ($3 >= $1) {
                        if (($3 - $1) < this.$29) {
                            $3 += this.$29;
                        }
                        this.$34($0, $1, $2, $3, painter, fill, stroke);
                    }
                }
                painter.endGroup();
            }
        },
        $34: function($p0, $p1, $p2, $p3, $p4, $p5, $p6) {
            $p5 = this.$39();
            var $0 = this.$31($p1, this.getStartWidth(), $p2, this.getEndWidth(), $p3);
            var $1 = this.$33($p0, $p1, $p3, this.getStartWidth(), $0);
            this.setSuffix('_rangedLevel');
            $p4.createGroup();
            $p4.clearGroup();
            this.setSuffix('_Back');
            $p4.drawGraphicsPath($p5, $p6, $1);
            this.setSuffix('_Divs');
            this.$35($p0, $p1, $p2, $p3, $p4);
            $p4.endGroup();
        },
        $35: function($p0, $p1, $p2, $p3, $p4) {
            var $0 = ($p2 - $p1) / this.getDivisions();
            for (var $1 = 1; $1 < this.getDivisions(); $1++) {
                var $2 = $p1 + $0 * $1;
                if ($2 >= $p3) {
                    break;
                }
                var $3 = this.$30($2, 1, $p1, this.getStartWidth(), $p2, this.getEndWidth());
                var $4 = $p0.valueToPoint($2, $3);
                $3 = this.$30($2, -1, $p1, this.getStartWidth(), $p2, this.getEndWidth());
                var $5 = $p0.valueToPoint($2, $3);
                var $6 = [$4, $5];
                this.setSuffix($1.toString());
                $p4.drawLine(this.getDivisionsStroke(), $6);
            }
        },
        getBoundedBox: function() {
            var $0 = Type.safeCast(this.getScale(), PerfectWidgets.Model.BaseElements.Composite);
            while (($0 != null) && (!(Type.canCast($0, PerfectWidgets.Model.BaseElements.ITrajectory)))) {
                $0 = $0.getParent();
            }
            if ($0 != null) {
                var $1 = this.getMaxValue();
                var $2 = this.getSmartValue(this.getValue(), $1);
                if (Type.canCast($0, PerfectWidgets.Model.BaseElements.Guide)) {
                    var $3 = $0;
                    var $4 = new Array(4);
                    $4[0] = $3.getStartPoint().add(new PerfectWidgets.Framework.DataObjects.Vector(0, this.getDistance()));
                    $4[1] = $3.getEndPoint().add(new PerfectWidgets.Framework.DataObjects.Vector(0, this.getDistance()));
                    $4[2] = $4[0].add(new PerfectWidgets.Framework.DataObjects.Vector(0, this.getStartWidth()));
                    $4[3] = $4[1].add(new PerfectWidgets.Framework.DataObjects.Vector(0, this.getEndWidth()));
                    return PerfectWidgets.Framework.Geometry.GeometryUtilities.getPolygonBox($4);
                } else {
                    var $5 = this.getSize() + Math.abs(this.getDistance());
                    var $6 = this.getScale().valueToPoint($2, 0).x - $5;
                    var $7 = this.getScale().valueToPoint($2, 0).y - $5;
                    var $8 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($6, $7, $5 * 2, $5 * 2);
                    return $8;
                }
            }
            return PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
        },
        $36: null,
        $37: null,
        $38: function() {
            var $0 = Type.safeCast(this.getScale(), PerfectWidgets.Model.BaseElements.Composite);
            while (($0 != null) && (!(Type.canCast($0, PerfectWidgets.Model.BaseElements.ITrajectory)))) {
                $0 = $0.getParent();
            }
            return $0;
        },
        $39: function() {
            var $0 = this.getFill();
            if ($0 == null) {
                var $1 = new PerfectWidgets.Framework.Drawing.MultiGradientFill();
                var $2 = this.getColors();
                $2.add(new PerfectWidgets.Framework.Drawing.GradientColor(this.getStartColor(), 0));
                $1.setColors(this.getColors());
                if ($0 == null) {
                    var $3 = this.$38();
                    if ($3 != null) {
                        if (Type.canCast($3, PerfectWidgets.Model.BaseElements.Joint)) {
                            var $4 = ($3);
                            var $5 = this.getMinValue();
                            var $6 = this.getMaxValue();
                            var $7 = $4.getStartAngle() + $4.getTotalAngle() * this.getScale().valueToPercent($5);
                            var $8 = $4.getStartAngle() + $4.getTotalAngle() * this.getScale().valueToPercent($6);
                            if (this.getDistance() < 0) {
                                $7 = $7 - 180;
                            } else {}
                            var $9 = (($8 + $7) / 2) % 360;
                            $1.setAngle($9 + 90);
                            $0 = $1;
                        } else {
                            var $A = Type.safeCast($3, PerfectWidgets.Model.BaseElements.Guide);
                            var $B = $A.getStartPoint();
                            var $C = $A.getEndPoint();
                            var $D = PerfectWidgets.Framework.DataObjects.Vector.toDegrees($C.minus($B).getRotation());
                            $1.setAngle($D);
                            $0 = $1;
                        }
                    }
                }
            }
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.ScaleMarks = function() {
        this.$26 = new PerfectWidgets.Framework.DataObjects.Vector(30, 30);
        this.$27 = new PerfectWidgets.Framework.DataObjects.Vector(20, 20);
        this.$29 = 1;
        PerfectWidgets.Model.BaseElements.ScaleMarks.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ScaleMarks.prototype = {
        $28: null,
        $2A: 0,
        getMarksSize: function() {
            return this.$26;
        },
        setMarksSize: function(marksSize) {
            this.$26 = marksSize;
            this.setNeedRepaint(true);
        },
        getSubMarksSize: function() {
            return this.$27;
        },
        setSubMarksSize: function(subMarksSize) {
            this.$27 = subMarksSize;
            this.setNeedRepaint(true);
        },
        getShape: function() {
            return this.$28;
        },
        setShape: function(shape) {
            if (this.$28 !== shape) {
                this.$28 = shape;
                this.setNeedRepaint(true);
            }
        },
        getRotationMode: function() {
            return this.$29;
        },
        setRotationMode: function(mode) {
            if (this.$29 !== mode) {
                this.$29 = mode;
                this.setNeedRepaint(true);
            }
        },
        getMarksAngle: function() {
            return this.$2A;
        },
        setMarksAngle: function(marksAngle) {
            if (this.$2A !== marksAngle) {
                this.$2A = marksAngle;
                this.setNeedRepaint(true);
            }
        },
        $2B: function($p0) {
            return $p0.getLength() * Math.cos($p0.getRotation() - PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getMarksAngle()));
        },
        getWidth: function() {
            return this.$2B(this.getMarksSize());
        },
        getSubWidth: function() {
            return this.$2B(this.getSubMarksSize());
        },
        $2C: function($p0) {
            var $0 = this.getMarksAngle();
            var $1 = this.getScale();
            if ($1 != null && this.getRotationMode() === 1) {
                var $2 = $1.valueToPoint($p0, this.getDistance() + 5).minus($1.valueToPoint($p0, this.getDistance()));
                $0 += PerfectWidgets.Framework.Geometry.GeometryUtilities.radianToDegree($2.getRotation());
            }
            return $0;
        },
        buildSubMark: function(targetPaths, startValue, endValue, fill, stroke, useStroke) {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = endValue - startValue;
                var $2 = this.getSubTicksInternalRadius() - this.getWidth() / 2 + this.getSubWidth() / 2;
                for (var $3 = 1; $3 < this.getSubDivisions(); $3++) {
                    var $4 = startValue + $1 / this.getSubDivisions() * $3;
                    this.setSuffix($4.toString());
                    this.$2F(targetPaths, $4, $2, this.getSubMarksSize(), fill, stroke);
                }
            }
        },
        buildMark: function(targetPaths, value, length, distance, fill, stroke, useStroke) {
            this.$2F(targetPaths, value, distance, this.getMarksSize(), fill, stroke);
        },
        $2D: function($p0, $p1, $p2, $p3) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            for (var $1 = 0; $1 < $p1.length; $1++) {
                $0.addGraphicsPath($p1[$1].get_path());
            }
            $0.setBounds(this.getBoundedBox());
            $p0.drawGraphicsPath($p2, $p3, $0);
        },
        $2E: function($p0, $p1, $p2) {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = this.getColorizer();
                var $2 = {};
                var $3 = [];
                for (var $4 = 0; $4 < $p1.length; $4++) {
                    var $5 = $1.getColor($0.valueToPercent($p1[$4].get_value()));
                    if (!Object.keyExists($2, $5)) {
                        var $6 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
                        $2[$5] = $6;
                        $3.add($5);
                    }
                    $2[$5].addGraphicsPath($p1[$4].get_path());
                }
                for (var $7 = 0; $7 < Object.getKeyCount($2); $7++) {
                    var $8 = $3[$7];
                    this.setSuffix($7.toString());
                    $p0.drawGraphicsPath(new PerfectWidgets.Framework.Drawing.SolidFill($8), $p2, $2[$8]);
                }
            }
        },
        mergeAndDrawPaths: function(painter, paths, fill, stroke) {
            var $0 = stroke;
            if ($0 == null) {
                $0 = this.getStroke();
            }
            var $1 = fill;
            if ($1 == null) {
                $1 = this.getFill();
                var $2 = this.getColorizer();
                if ($2 != null) {
                    this.$2E(painter, paths, $0);
                    return;
                }
            }
            this.$2D(painter, paths, $1, $0);
        },
        $2F: function($p0, $p1, $p2, $p3, $p4, $p5) {
            var $0 = this.getScale();
            if ($0 != null && this.needPaint($p1) && this.getShape() != null) {
                var $1 = $0.valueToPoint($p1, $p2);
                var $2 = $1.minus($p3.divideByNumber(2));
                var $3 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($2.x, $2.y, $p3.x, $p3.y);
                var $4 = this.$2C($p1);
                var $5 = new PerfectWidgets.Framework.Transformation.RotateTransformation();
                $5.setAngle($4);
                $5.setCenter($1);
                if (($p3.x > 0.001) && ($p3.y > 0.001)) {
                    $p0.add(new PerfectWidgets.Model.Drawing.ValuePathPair($p1, this.getShape().buildShapePath($3, $5)));
                }
            }
        },
        getHitTest: function(point) {
            return false;
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = $0.pointToValue(point);
                var $2 = this.getSize();
                var $3 = $0.valueToPoint($1, this.getDistance() - $2 / 2);
                var $4 = $0.valueToPoint($1, this.getDistance() + $2 / 2);
                if (point.minus($3).getLength() + point.minus($4).getLength() <= $3.minus($4).getLength() + 1) {
                    return true;
                }
            }
            return PerfectWidgets.Model.BaseElements.ScaleMarks.callBaseMethod(this, 'getHitTest', [point]);
        },
        getBoundedBox: function() {
            return PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
        },
        getSize: function() {
            var $0 = this.getMarksSize();
            var $1 = this.getSubMarksSize();
            var $2 = Math.sqrt($0.x * $0.x + $0.y * $0.y);
            var $3 = Math.sqrt($1.x * $1.x + $1.y * $1.y);
            return Math.max($2, $3);
        }
    }
    PerfectWidgets.Model.BaseElements.ScaleTitle = function() {
        this.$3A = '';
        PerfectWidgets.Model.BaseElements.ScaleTitle.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ScaleTitle.prototype = {
        getText: function() {
            return this.$3A + '';
        },
        setText: function(textValue) {
            this.$3A = textValue + '';
        },
        getLabelsCount: function() {
            return 1;
        },
        getObjectByIndex: function(index) {
            if (!!index) {
                throw new Error('index out of range');
            }
            return this.getText();
        },
        getValueByIndex: function(index) {
            if (!!index) {
                throw new Error('index out of range');
            }
            if (this.getScale() != null) {
                switch (this.getOrigin().getKind()) {
                    case 0:
                        return (this.getScale().getMaximum() + this.getScale().getMaximum()) / 2;
                    case 1:
                        return this.getOrigin().getValue();
                    case 2:
                        return this.getScale().percentToValue(this.getOrigin().getValue() / 100);
                }
            }
            return 0;
        }
    }
    PerfectWidgets.Model.BaseElements.ShapeBase = function() {}
    PerfectWidgets.Model.BaseElements.ShapeBase.registerShape = function(shapeType) {
        PerfectWidgets.Model.BaseElements.ShapeBase.$0.add(shapeType);
    }
    PerfectWidgets.Model.BaseElements.ShapeBase.register = function() {
        if (!PerfectWidgets.Model.BaseElements.ShapeBase.$1) {
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.RectangleShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.LineShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.EllipseShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.RoundRectangleShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.TriangleShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.ArrowShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.RectTriangleShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.DiamondShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.ParallelogramShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.registerShape(PerfectWidgets.Model.BaseElements.StarShape);
            PerfectWidgets.Model.BaseElements.ShapeBase.$1 = true;
        }
    }
    PerfectWidgets.Model.BaseElements.ShapeBase.prototype = {
        buildShapePath: function(rect, transformation) {
            return this.createPath(rect, transformation);
        },
        toString: function() {
            return Type.getInstanceType(this).get_name();
        }
    }
    PerfectWidgets.Model.BaseElements.RectangleShape = function() {
        PerfectWidgets.Model.BaseElements.RectangleShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.RectangleShape.prototype = {
        createPath: function(rect, transformation) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            $0.startPath(transformation.apply(rect.getTopLeft()));
            var $1 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $1.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply(rect.getTopRight())));
            $1.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply(rect.getBottomRight())));
            $1.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply(rect.getBottomLeft())));
            $0.addPathElement($1);
            $0.terminate();
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.EllipseShape = function() {
        PerfectWidgets.Model.BaseElements.EllipseShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.EllipseShape.prototype = {
        createPath: function(rect, transformation) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint(rect.getCenter(), new PerfectWidgets.Framework.DataObjects.Vector(rect.width / 2, rect.height / 2), 0);
            var $2 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint(rect.getCenter(), new PerfectWidgets.Framework.DataObjects.Vector(rect.width / 2, rect.height / 2), 180);
            $0.startPath(transformation.apply($1));
            var $3 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            $3.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillLowLevelParameters(rect.width / 2, rect.height / 2, transformation.apply($2), 0, 180, transformation));
            $3.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillLowLevelParameters(rect.width / 2, rect.height / 2, transformation.apply($1), 180, 360, transformation));
            $0.addPathElement($3);
            $0.terminate();
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.RoundRectangleShape = function() {
        PerfectWidgets.Model.BaseElements.RoundRectangleShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.RoundRectangleShape.prototype = {
        $2: 0.2,
        getRound: function() {
            return this.$2;
        },
        setRound: function(roundValue) {
            this.$2 = roundValue;
        },
        createPath: function(rect, transformation) {
            var $0 = null;
            var $1 = null;
            var $2 = null;
            var $3 = Math.min(rect.height, rect.width);
            $3 *= this.getRound();
            var $4 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $5 = 0;
            var $6 = Type.safeCast(transformation, PerfectWidgets.Framework.Transformation.RotateTransformation);
            if ($6 != null) {
                $5 = $6.getAngle();
            }
            $2 = $0 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getLeft() + $3, rect.getTop());
            $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getRight() - $3, rect.getTop());
            $4.startPath(transformation.apply($0));
            var $7 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $7.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($1)));
            $4.addPathElement($7);
            $0 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getRight(), rect.getTop() + $3);
            $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getRight(), rect.getBottom() - $3);
            var $8 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            $8.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillLowLevelParameters($3, $3, transformation.apply($0), -90, 90, $6));
            $4.addPathElement($8);
            $7 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $7.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($0)));
            $7.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($1)));
            $4.addPathElement($7);
            $8 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            $0 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getRight() - $3, rect.getBottom());
            $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getLeft() + $3, rect.getBottom());
            $8.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillLowLevelParameters($3, $3, transformation.apply($0), 0, 90, $6));
            $4.addPathElement($8);
            $7 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $7.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($0)));
            $7.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($1)));
            $4.addPathElement($7);
            $8 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            $0 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getLeft(), rect.getBottom() - $3);
            $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getLeft(), rect.getTop() + $3);
            $8.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillLowLevelParameters($3, $3, transformation.apply($0), 90, 90, $6));
            $4.addPathElement($8);
            $7 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $7.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($0)));
            $7.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($1)));
            $4.addPathElement($7);
            $8 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            $8.add(PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillLowLevelParameters($3, $3, transformation.apply($2), 180, 90, $6));
            $4.addPathElement($8);
            $4.terminate();
            return $4;
        }
    }
    PerfectWidgets.Model.BaseElements.TriangleShape = function() {
        this.$2 = 0;
        PerfectWidgets.Model.BaseElements.TriangleShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.TriangleShape.prototype = {
        getDirection: function() {
            return this.$2;
        },
        setDirection: function(shapeDirectionValue) {
            this.$2 = shapeDirectionValue;
        },
        createPath: function(rect, transformation) {
            var $0 = null;
            var $1 = null;
            var $2 = null;
            var $3 = null;
            var $4 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            switch (this.getDirection()) {
                case 3:
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x, rect.y);
                    $2 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x, rect.y + rect.height);
                    $3 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width, rect.y + rect.height / 2);
                    break;
                case 2:
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width, rect.y);
                    $2 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width, rect.y + rect.height);
                    $3 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x, rect.y + rect.height / 2);
                    break;
                case 1:
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x, rect.y);
                    $2 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width, rect.y);
                    $3 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width / 2, rect.y + rect.height);
                    break;
                case 0:
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x, rect.y + rect.height);
                    $2 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width, rect.y + rect.height);
                    $3 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width / 2, rect.y);
                    break;
            }
            $4.startPath(transformation.apply($1));
            $0 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $0.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($2)));
            $0.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($3)));
            $4.addPathElement($0);
            $4.terminate();
            return $4;
        }
    }
    PerfectWidgets.Model.BaseElements.ArrowShape = function() {
        this.$2 = 0;
        PerfectWidgets.Model.BaseElements.ArrowShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ArrowShape.prototype = {
        getDirection: function() {
            return this.$2;
        },
        setDirection: function(shapeDirectionValue) {
            this.$2 = shapeDirectionValue;
        },
        $3: function($p0) {
            var $0, $1;
            switch (this.getDirection()) {
                case 3:
                    $0 = $p0.height * 0.3;
                    $1 = Math.min($p0.height / 2, $p0.width / 2);
                    return [new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $0), new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $p0.height - $0), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $1, $p0.y + $p0.height - $0), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $1, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $p0.height / 2), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $1, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $1, $p0.y + $0)];
                case 2:
                    $0 = $p0.height * 0.3;
                    $1 = Math.min($p0.height / 2, $p0.width / 2);
                    return [new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $0), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $p0.height - $0), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $1, $p0.y + $p0.height - $0), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $1, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $p0.height / 2), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $1, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $1, $p0.y + $0)];
                case 1:
                    $0 = $p0.width * 0.3;
                    $1 = Math.min($p0.height / 2, $p0.width / 2);
                    return [new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $0, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $0, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $0, $p0.y + $p0.height - $1), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $p0.height - $1), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width / 2, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $p0.height - $1), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $0, $p0.y + $p0.height - $1)];
                case 0:
                    $0 = $p0.width * 0.3;
                    $1 = Math.min($p0.height / 2, $p0.width / 2);
                    return [new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $0, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $0, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $0, $p0.y + $1), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $1), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width / 2, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $1), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $0, $p0.y + $1)];
            }
            return null;
        },
        createPath: function(rect, transformation) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            var $2 = this.$3(rect);
            $0.startPath(transformation.apply($2[0]));
            for (var $3 = 1; $3 < $2.length; $3++) {
                $1.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($2[$3])));
            }
            $0.addPathElement($1);
            $0.terminate();
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.RectTriangleShape = function() {
        this.$2 = 0;
        PerfectWidgets.Model.BaseElements.RectTriangleShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.RectTriangleShape.prototype = {
        getDirection: function() {
            return this.$2;
        },
        setDirection: function(shapeDirectionValue) {
            this.$2 = shapeDirectionValue;
        },
        $3: function($p0) {
            var $0;
            switch (this.getDirection()) {
                case 3:
                    $0 = Math.min($p0.height / 2, $p0.width / 2);
                    return [new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $0, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $p0.height / 2), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width - $0, $p0.y)];
                case 2:
                    $0 = Math.min($p0.height / 2, $p0.width / 2);
                    return [new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $0, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $p0.height / 2), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $0, $p0.y)];
                case 1:
                    $0 = Math.min($p0.height / 2, $p0.width / 2);
                    return [new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $p0.height - $0), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width / 2, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $p0.height - $0)];
                case 0:
                    $0 = Math.min($p0.height / 2, $p0.width / 2);
                    return [new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $p0.height), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width, $p0.y + $0), new PerfectWidgets.Framework.DataObjects.Vector($p0.x + $p0.width / 2, $p0.y), new PerfectWidgets.Framework.DataObjects.Vector($p0.x, $p0.y + $0)];
            }
            return null;
        },
        createPath: function(rect, transformation) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            var $2 = this.$3(rect);
            $0.startPath(transformation.apply($2[0]));
            for (var $3 = 1; $3 < $2.length; $3++) {
                $1.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($2[$3])));
            }
            $0.addPathElement($1);
            $0.terminate();
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.DiamondShape = function() {
        PerfectWidgets.Model.BaseElements.DiamondShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.DiamondShape.prototype = {
        createPath: function(rect, transformation) {
            var $0 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width / 2, rect.y);
            var $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x, rect.y + rect.height / 2);
            var $2 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width / 2, rect.y + rect.height);
            var $3 = new PerfectWidgets.Framework.DataObjects.Vector(rect.x + rect.width, rect.y + rect.height / 2);
            var $4 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            $4.startPath(transformation.apply($0));
            var $5 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $5.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($1)));
            $5.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($2)));
            $5.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($3)));
            $4.addPathElement($5);
            $4.terminate();
            return $4;
        }
    }
    PerfectWidgets.Model.BaseElements.ParallelogramShape = function() {
        PerfectWidgets.Model.BaseElements.ParallelogramShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ParallelogramShape.prototype = {
        $2: 30,
        getAngle: function() {
            return this.$2;
        },
        setAngle: function(angleValue) {
            this.$2 = angleValue;
        },
        createPath: function(rect, transformation) {
            var $0 = Math.min((rect.height * Math.sin(this.getAngle() * Math.PI / 180)), rect.width);
            var $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getLeft() + $0, rect.getTop());
            var $2 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getRight(), rect.getTop());
            var $3 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getRight() - $0, rect.getBottom());
            var $4 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getLeft(), rect.getBottom());
            var $5 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            $5.startPath(transformation.apply($1));
            var $6 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $6.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($2)));
            $6.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($3)));
            $6.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($4)));
            $5.addPathElement($6);
            $5.terminate();
            return $5;
        }
    }
    PerfectWidgets.Model.BaseElements.StarShape = function() {
        PerfectWidgets.Model.BaseElements.StarShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.StarShape.prototype = {
        $2: 0.38,
        getInternalRadius: function() {
            return this.$2;
        },
        setInternalRadius: function(internalRadiusValue) {
            this.$2 = internalRadiusValue;
        },
        $3: 5,
        getPoints: function() {
            return this.$3;
        },
        setPoints: function(pointsValue) {
            this.$3 = pointsValue;
        },
        $4: 0,
        getStartAngle: function() {
            return this.$4;
        },
        setStartAngle: function(startAngleValue) {
            this.$4 = startAngleValue;
        },
        createPath: function(rect, transformation) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            var $2 = rect.x + rect.width / 2;
            var $3 = rect.y + rect.height / 2;
            var $4 = rect.width / 2;
            var $5 = rect.height / 2;
            var $6 = $4 * this.getInternalRadius();
            var $7 = $5 * this.getInternalRadius();
            var $8 = Math.PI / this.getPoints();
            var $9 = $8 * 2;
            var $A = new Array(this.getPoints() * 2);
            for (var $B = 0; $B < this.getPoints(); $B++) {
                var $C = $B * $9 + (Math.PI * this.getStartAngle() / 180);
                var $D = $2 + ($4 * Math.sin($C));
                var $E = $3 - ($5 * Math.cos($C));
                $A[$B * 2] = new PerfectWidgets.Framework.DataObjects.Vector($D, $E);
                $C += $8;
                $D = $2 + ($6 * Math.sin($C));
                $E = $3 - ($7 * Math.cos($C));
                $A[$B * 2 + 1] = new PerfectWidgets.Framework.DataObjects.Vector($D, $E);
            }
            $0.startPath(transformation.apply($A[0]));
            for (var $F = 1; $F < $A.length; $F++) {
                $1.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($A[$F])));
            }
            $0.addPathElement($1);
            $0.terminate();
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.CrossShape = function() {
        PerfectWidgets.Model.BaseElements.CrossShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.CrossShape.prototype = {
        getVertice: function(location, size) {
            var $0 = new Array(12);
            var $1 = 0.15;
            var $2 = new PerfectWidgets.Framework.DataObjects.Vector(size.x * $1, 0);
            var $3 = new PerfectWidgets.Framework.DataObjects.Vector(0, size.y * $1);
            $0[0] = location.add(new PerfectWidgets.Framework.DataObjects.Vector(size.x / 2, 0)).minus($2);
            $0[11] = location.add(size.divideByNumber(2)).minus($2).minus($3);
            $0[10] = location.add(new PerfectWidgets.Framework.DataObjects.Vector(0, size.y / 2)).minus($3);
            $0[9] = location.add(new PerfectWidgets.Framework.DataObjects.Vector(0, size.y / 2)).add($3);
            $0[8] = location.add(size.divideByNumber(2)).minus($2).add($3);
            $0[7] = location.add(new PerfectWidgets.Framework.DataObjects.Vector(size.x / 2, size.y)).minus($2);
            $0[6] = location.add(new PerfectWidgets.Framework.DataObjects.Vector(size.x / 2, size.y)).add($2);
            $0[5] = location.add(size.divideByNumber(2)).add($2).add($3);
            $0[4] = location.add(new PerfectWidgets.Framework.DataObjects.Vector(size.x, size.y / 2)).add($3);
            $0[3] = location.add(new PerfectWidgets.Framework.DataObjects.Vector(size.x, size.y / 2)).minus($3);
            $0[2] = location.add(size.divideByNumber(2)).add($2).minus($3);
            $0[1] = location.add(new PerfectWidgets.Framework.DataObjects.Vector(size.x / 2, 0)).add($2);
            return $0;
        },
        createPath: function(rect, transformation) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = this.getVertice(rect.getTopLeft(), new PerfectWidgets.Framework.DataObjects.Vector(rect.width, rect.height));
            if ($1 == null || !$1.length) {
                throw new Error('No points to create GraphicsPath');
            }
            var $2 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $0.startPath(transformation.apply($1[0]));
            for (var $3 = 1; $3 < $1.length; $3++) {
                $2.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($1[$3])));
            }
            $0.addPathElement($2);
            $0.terminate();
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.LineShape = function() {
        this.$2 = 0;
        PerfectWidgets.Model.BaseElements.LineShape.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.LineShape.prototype = {
        getLineKind: function() {
            return this.$2;
        },
        setLineKind: function(lineKindValue) {
            this.$2 = lineKindValue;
        },
        createPath: function(rect, transformation) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = null;
            var $2 = null;
            var $3 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            if (!this.getLineKind()) {
                $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getLeft(), rect.getBottom());
                $2 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getRight(), rect.getTop());
            } else {
                $1 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getLeft(), rect.getTop());
                $2 = new PerfectWidgets.Framework.DataObjects.Vector(rect.getRight(), rect.getBottom());
            }
            $0.startPath(transformation.apply($1));
            $3.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector(transformation.apply($2)));
            $0.addPathElement($3);
            $0.terminate();
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.LinearLevel = function() {
        this.$2C = 1;
        this.$2D = 1;
        PerfectWidgets.Model.BaseElements.LinearLevel.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.LinearLevel.getWholePath = function(pocketRadius, width, startPoint, length, needThermometer, asThermometer, startCap, endCap) {
        var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
        var $1 = new PerfectWidgets.Framework.DataObjects.Vector(startPoint.x + length, startPoint.y);
        var $2 = new PerfectWidgets.Framework.DataObjects.Vector(0, width / 2);
        $0.startPath(startPoint.minus($2));
        $0.addLine($1.minus($2));
        var $3 = new PerfectWidgets.Framework.DataObjects.Vector(width, width);
        var $4 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($1.x - $3.x / 2, $1.y - $3.y / 2, $3.x, $3.y);
        if (endCap === 1) {
            $0.addArc($4, -90, 180);
        } else {
            $0.addLine($1.add($2));
        }
        $0.addLine(startPoint.add($2));
        var $5 = !needThermometer;
        if (asThermometer) {
            var $6 = width / (2 * pocketRadius);
            if (Math.abs($6) <= 1) {
                var $7 = Math.asin($6);
                var $8 = PerfectWidgets.Framework.DataObjects.Vector.toDegrees($7);
                var $9 = new PerfectWidgets.Framework.DataObjects.Vector(pocketRadius * 2, pocketRadius * 2);
                var $A = Math.sqrt(pocketRadius * pocketRadius - width * width / 4);
                var $B = new PerfectWidgets.Framework.DataObjects.Vector(startPoint.x - $A, startPoint.y).minus(new PerfectWidgets.Framework.DataObjects.Vector($9.x / 2, $9.y / 2));
                var $C = new PerfectWidgets.Framework.DataObjects.VectorRectangle($B.x, $B.y, $9.x, $9.y);
                $0.addArc($C, $8, 360 - 2 * $8);
            } else {
                $5 = true;
            }
        }
        if ($5) {
            $4.x = startPoint.x - $3.x / 2;
            $4.y = startPoint.y - $3.y / 2;
            if (startCap === 1) {
                $0.addArc($4, 90, 180);
            } else {
                $0.addLine(startPoint.minus($2));
            }
        }
        return $0;
    }
    PerfectWidgets.Model.BaseElements.LinearLevel.prototype = {
        $2A: 0,
        getEffect3D: function() {
            return this.$2A;
        },
        setEffect3D: function(effect3dValue) {
            if (this.$2A !== effect3dValue) {
                this.$2A = effect3dValue;
                this.setNeedRepaint(true);
            }
        },
        $2B: 31.25,
        getWidth: function() {
            return this.$2B;
        },
        setWidth: function(widthValue) {
            this.$2B = widthValue;
            this.setNeedRepaint(true);
        },
        getStartCap: function() {
            return this.$2C;
        },
        setStartCap: function(startCapValue) {
            if (this.$2C !== startCapValue) {
                this.$2C = startCapValue;
                this.setNeedRepaint(true);
            }
        },
        getEndCap: function() {
            return this.$2D;
        },
        setEndCap: function(endCapValue) {
            if (this.$2D !== endCapValue) {
                this.$2D = endCapValue;
                this.setNeedRepaint(true);
            }
        },
        $2E: false,
        getShowAsThermometer: function() {
            return this.$2E;
        },
        setShowAsThermometer: function(showAsThermometerValue) {
            if (this.$2E !== showAsThermometerValue) {
                this.$2E = showAsThermometerValue;
                this.setNeedRepaint(true);
            }
        },
        $2F: 37.5,
        getPocketRadius: function() {
            return this.$2F;
        },
        setPocketRadius: function(pocketRadiusValue) {
            if (this.$2F !== pocketRadiusValue) {
                this.$2F = pocketRadiusValue;
                this.setNeedRepaint(true);
            }
        },
        getSize: function() {
            return Math.abs(this.$2B);
        },
        getHitTest: function(point) {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = this.getMinValue();
                var $2 = this.getMaxValue();
                var $3 = Math.min($2, this.getSmartValue(this.getValue(), $2));
                var $4 = $0.valueToPoint($1, this.getDistance());
                var $5 = $0.valueToPoint($2, this.getDistance());
                var $6 = $4.minus($5).getLength() * $0.valueToPercent($3);
                var $7 = 0.0001;
                if ((Math.abs($6) > $7) || this.getShowAsThermometer()) {
                    return PerfectWidgets.Framework.Geometry.GeometryUtilities.isLineIncludePoint(point, $4, $5, this.getWidth() / 2);
                }
            }
            return false;
        },
        $30: function() {
            var $0 = [];
            var $1 = this.getScale();
            var $2 = this.getPocketRadius();
            var $3 = this.getWidth();
            var $4 = this.getDistance();
            var $5 = this.$32($1);
            var $6 = this.$33($1);
            var $7 = $1.valueToPoint($5, $4);
            var $8 = $1.valueToPoint($6, $4);
            var $9 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getTransformMatrix($7, Math.PI / 2 - $8.minus($7).getRotation());
            var $A = new PerfectWidgets.Framework.Transformation.MatrixTransformation($9);
            var $B = $7;
            var $C = Math.max($3 / 2, $2);
            var $D = $1.valueToPercent(Math.min($6, PerfectWidgets.Model.BaseElements._ElementPainter.$2(this.getValue(), $6, this)));
            var $E = $7.minus($8).getLength() * $D;
            var $F = this.getShowAsThermometer();
            var $10 = this.getShowAsThermometer();
            var $11 = this.getStartCap();
            var $12 = this.getEndCap();
            var $13 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            $8 = new PerfectWidgets.Framework.DataObjects.Vector($7.x + $E, $7.y);
            var $14 = new PerfectWidgets.Framework.DataObjects.Vector(0, $3 / 2);
            var $15 = this.$31([$7.minus($14), $8.minus($14), $8.add($14), $7.add($14)], $A);
            $0.add($15);
            var $16 = new PerfectWidgets.Framework.DataObjects.Vector($3, $3);
            var $17 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($8.x - $16.x / 2, $8.y - $16.y / 2, $16.x, $16.y);
            if ($12 === 1) {
                var $1A = this.$31($17.getVertice(), $A);
                $0.add($1A);
            }
            var $18 = !$F;
            if ($10) {
                var $1B = $3 / (2 * $2);
                if (Math.abs($1B) <= 1) {
                    var $1C = Math.asin($1B);
                    var $1D = PerfectWidgets.Framework.DataObjects.Vector.toDegrees($1C);
                    var $1E = new PerfectWidgets.Framework.DataObjects.Vector($2 * 2, $2 * 2);
                    var $1F = Math.sqrt($2 * $2 - $3 * $3 / 4);
                    var $20 = new PerfectWidgets.Framework.DataObjects.Vector($7.x - $1F, $7.y).minus(new PerfectWidgets.Framework.DataObjects.Vector($1E.x / 2, $1E.y / 2));
                    var $21 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($20.x, $20.y, $1E.x, $1E.y);
                } else {
                    $18 = true;
                }
            }
            if ($18) {
                $17.x = $7.x - $16.x / 2;
                $17.y = $7.y - $16.y / 2;
                if ($11 === 1) {
                    var $22 = $17.getVertice();
                    $0.add($22);
                }
            }
            var $19 = new Array(4);
            $19[0] = new PerfectWidgets.Framework.DataObjects.Vector($B.x - $C, $B.y - $C);
            $19[1] = new PerfectWidgets.Framework.DataObjects.Vector($B.x - $C, $B.y + $C);
            $19[2] = new PerfectWidgets.Framework.DataObjects.Vector($B.x + $C, $B.y + $C);
            $19[3] = new PerfectWidgets.Framework.DataObjects.Vector($B.x + $C, $B.y - $C);
            $0.add(this.$31($19, $A));
            return $0;
        },
        $31: function($p0, $p1) {
            var $0 = new Array($p0.length);
            for (var $1 = 0; $1 < $p0.length; $1++) {
                $0[$1] = $p1.apply($p0[$1]);
            }
            return $0;
        },
        $32: function($p0) {
            return PerfectWidgets.Model.BaseElements._ElementPainter.$2(this.getMinLimit(), $p0.getMinimum(), this);
        },
        $33: function($p0) {
            return PerfectWidgets.Model.BaseElements._ElementPainter.$2(this.getMaxLimit(), $p0.getMaximum(), this);
        },
        $34: function($p0, $p1) {
            var $0 = this.getFill();
            if ($0 == null) {
                var $1 = $p0.minus($p1).getLength();
                var $2 = 0;
                var $3 = 0;
                if (this.getStartCap() === 1) {
                    $2 = this.getWidth() / 2;
                }
                if (this.getEndCap() === 1) {
                    $3 = this.getWidth() / 2;
                }
                var $4 = $1 + $2 + $3;
                var $5 = new PerfectWidgets.Framework.Drawing.MultiGradientFill();
                var $6 = $5.getColors();
                $6.add(new PerfectWidgets.Framework.Drawing.GradientColor(this.getStartColor(), 0));
                $6.add(new PerfectWidgets.Framework.Drawing.GradientColor(this.getStartColor(), $2 / $4));
                $6.add(new PerfectWidgets.Framework.Drawing.GradientColor(this.getEndColor(), 1));
                $6.add(new PerfectWidgets.Framework.Drawing.GradientColor(this.getEndColor(), 1 - $3 / $4));
                $5.setAngle(0);
                var $7 = this.getColors();
                var $8;
                for (var $9 = 0; $9 < $7.getCount(); $9++) {
                    $8 = $7.get($9);
                    $6.add(new PerfectWidgets.Framework.Drawing.GradientColor($8.getColor(), ($8.getPortion() * $1 + $2) / $4));
                }
                $5.setColors($6);
                $0 = $5;
            }
            return $0;
        },
        drawLinearLevel: function(painter, wholeFill, wholeStroke) {
            var $0 = this.getScale();
            var $1 = this.$32($0);
            var $2 = this.$33($0);
            var $3 = $0.valueToPoint($1, this.getDistance());
            var $4 = $0.valueToPoint($2, this.getDistance());
            var $5 = $0.valueToPercent(Math.min($2, PerfectWidgets.Model.BaseElements._ElementPainter.$2(this.getValue(), $2, this)));
            if (($5 >= 0) && ($5 <= 1) && (Math.abs(this.getWidth()) > 0.001)) {
                var $6 = $3.minus($4).getLength() * $5;
                if ((Math.abs($6) > 0.001) || this.getShowAsThermometer()) {
                    var $7 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getTransformMatrix($3, Math.PI / 2 - $4.minus($3).getRotation());
                    var $8 = $3.minus($4).getLength();
                    var $9 = PerfectWidgets.Model.BaseElements.LinearLevel.getWholePath(this.getPocketRadius(), this.getWidth(), $3, $6, this.getShowAsThermometer(), false, this.getStartCap(), this.getEndCap());
                    var $A = PerfectWidgets.Model.BaseElements.LinearLevel.getWholePath(this.getPocketRadius(), this.getWidth(), $3, $6, this.getShowAsThermometer(), this.getShowAsThermometer(), this.getStartCap(), this.getEndCap());
                    $9.setBounds(new PerfectWidgets.Framework.DataObjects.VectorRectangle($3.x, $3.y - this.$2B / 2, $8, this.$2B));
                    $A.setBounds(new PerfectWidgets.Framework.DataObjects.VectorRectangle($3.x, $3.y - this.$2B / 2, $8, this.$2B));
                    var $B = (wholeFill == null) ? PerfectWidgets.Model.BaseElements._ElementPainter.$4($3, $4, this.getEffect3D()) : wholeFill;
                    var $C = (wholeFill == null) ? this.getFill() : null;
                    if (($C == null) && (wholeFill == null)) {
                        var $11 = new PerfectWidgets.Framework.Drawing.SolidFill(this.getStartColor());
                    }
                    var $D = wholeFill;
                    if ($D == null) {
                        switch (this.getEffect3D()) {
                            case 0:
                                var $E = new PerfectWidgets.Framework.Drawing.SphericalFill();
                                $E.setStartColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 0, 0, 0));
                                $E.setEndColor(this.getStartColor());
                                $E.setAngle(225);
                                $E.setDelta(0.4);
                                $D = $E;
                                break;
                            case 1:
                                $E = new PerfectWidgets.Framework.Drawing.SphericalFill();
                                $E.setStartColor(this.getStartColor());
                                $E.setEndColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 0, 0, 0));
                                $E.setAngle(225);
                                $E.setDelta(0.4);
                                $D = $E;
                                break;
                        }
                    }
                    var $F = (wholeFill == null) ? this.$34($3, $4) : null;
                    var $10 = (wholeStroke == null) ? this.getStroke() : wholeStroke;
                    if (this.getShowAsThermometer()) {
                        var $12 = $3.minus($4);
                        var $13 = 0;
                        var $14 = Math.max(this.getWidth() / 2, this.getPocketRadius());
                        if (this.getWidth() / 2 < $14) {
                            $13 = Math.sqrt($14 * $14 - this.getWidth() * this.getWidth() / 4);
                        }
                        $12.setLength($12.getLength() + $13);
                        $12 = $12.add($4);
                        this.setSuffix('pocketFill');
                        painter.drawCircle($C, null, $12, $14);
                        this.setSuffix('pocketTransparentFill');
                        painter.drawCircle($D, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $12, $14);
                        if (($5 < 0) || ($5 > 1)) {
                            painter.drawCircle(PerfectWidgets.Framework.Drawing.Fill.emptyFill, $10, $12, $14);
                        }
                    }
                    if (($5 >= 0) && ($5 <= 1)) {
                        this.setSuffix('_rotation');
                        painter.startTransformation($7);
                        this.setSuffix('colors');
                        painter.drawGraphicsPath($F, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $9);
                        this.setSuffix('transparent');
                        painter.drawGraphicsPath($B, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $9);
                        if ((wholeFill == null) || (wholeStroke == null)) {
                            this.$35(painter, $3, $4, $5);
                        }
                        this.setSuffix('stroke');
                        painter.drawGraphicsPath(PerfectWidgets.Framework.Drawing.Fill.emptyFill, $10, $A);
                        painter.endTransformation();
                    }
                } else {
                    painter.clearGroup();
                }
            }
        },
        $35: function($p0, $p1, $p2, $p3) {
            if (!this.getDivisions()) {
                return;
            }
            var $0 = 1 / this.getDivisions();
            var $1 = $p1.minus($p2).getLength() / this.getDivisions();
            var $2 = (this.getStartCap() === 1) ? 0 : 1;
            var $3 = this.getDivisions() - ((this.getEndCap() === 1) ? 0 : 1);
            for (var $4 = $2; $4 <= $3; $4++) {
                var $5 = $0 * $4;
                var $6 = new PerfectWidgets.Framework.DataObjects.Vector(0, this.getWidth() / 2);
                var $7 = new PerfectWidgets.Framework.DataObjects.Vector($p1.x + $1 * $4, $p1.y);
                this.setSuffix('division' + $4.toString());
                $p0.drawLine(this.getDivisionsStroke(), [$7.minus($6), $7.add($6)]);
                if ($5 >= $p3) {
                    break;
                }
            }
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                this.setSuffix('_linearLevel');
                painter.createGroup();
                painter.clearGroup();
                this.drawLinearLevel(painter, null, null);
                painter.endGroup();
                this.setNeedRepaint(false);
            }
        }
    }
    PerfectWidgets.Model.BaseElements.Spring = function() {
        PerfectWidgets.Model.BaseElements.Spring.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Spring.prototype = {
        $23: 100,
        getAmplitude: function() {
            return this.$23;
        },
        setAmplitude: function(amplitudeValue) {
            if (amplitudeValue !== this.$23) {
                this.$23 = amplitudeValue;
                this.setNeedRepaint(true);
            }
        },
        $24: 10,
        getCoilsCount: function() {
            return this.$24;
        },
        setCoilsCount: function(coilsCountValue) {
            coilsCountValue = Math.abs(coilsCountValue);
            if ((this.$24 !== coilsCountValue) && (!!coilsCountValue)) {
                this.setNeedRepaint(true);
                this.$24 = coilsCountValue;
            }
        },
        $25: function() {
            var $0 = this.getCoilsCount();
            var $1 = new Array($0 + 2);
            $1[0] = this.getStartPoint();
            var $2 = this.getEndPoint().minus(this.getStartPoint());
            var $3 = $2.getPerpendicular();
            $3.setLength(this.getAmplitude());
            $2.setLength($2.getLength() / $0);
            var $4 = 1;
            for (var $5 = 1; $5 <= $0; $5++) {
                var $6 = this.getStartPoint().add($2.multiply(new PerfectWidgets.Framework.DataObjects.Vector($5 - 0.5, $5 - 0.5))).add($3.multiply(new PerfectWidgets.Framework.DataObjects.Vector($4, $4)));
                $1[$5] = $6;
                $4 *= -1;
            }
            $1[$1.length - 1] = this.getEndPoint();
            return $1;
        },
        onPaint: function(painter, fill, stroke) {
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                painter.setContext(this);
                var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
                var $1 = this.$25();
                $0.startPath($1[0]);
                var $2 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
                for (var $3 = 1; $3 < $1.length; $3++) {
                    $2.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector($1[$3]));
                }
                $0.addPathElement($2);
                painter.drawGraphicsPath(fill, stroke, $0);
            }
        },
        getHitTest: function(point) {
            var $0 = this.$25();
            var $1 = false;
            for (var $2 = 0; $2 < $0.length - 1; $2++) {
                $1 = ($1 | this.isIncludePoint(point, $0[$2], $0[$2 + 1])) === 1;
            }
            return $1;
        }
    }
    PerfectWidgets.Model.BaseElements.Tank = function() {
        this.$24 = 0;
        this.$25 = PerfectWidgets.Framework.Drawing.Color.lime;
        this.$26 = PerfectWidgets.Framework.Drawing.Color.gainsboro;
        PerfectWidgets.Model.BaseElements.Tank.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Tank.prototype = {
        getEffect3D: function() {
            return this.$24;
        },
        setEffect3D: function(effect3dValue) {
            this.$24 = effect3dValue;
            this.setNeedRepaint(true);
        },
        getLiquidColor: function() {
            return this.$25;
        },
        setLiquidColor: function(myVarValue) {
            this.$25 = myVarValue;
            this.setNeedRepaint(true);
        },
        getTankColor: function() {
            return this.$26;
        },
        setTankColor: function(tankColorValue) {
            this.$26 = tankColorValue;
            this.setNeedRepaint(true);
        },
        $27: 0,
        getDepth: function() {
            return this.$27;
        },
        setDepth: function(depthValue) {
            this.$27 = depthValue;
            this.setNeedRepaint(true);
        },
        $28: 150,
        getWidth: function() {
            return this.$28;
        },
        setWidth: function(widthValue) {
            this.$28 = widthValue;
            this.setNeedRepaint(true);
        },
        $29: 25,
        getTankWidth: function() {
            return this.$29;
        },
        setTankWidth: function(tankWidthValue) {
            this.$29 = tankWidthValue;
            this.setNeedRepaint(true);
        },
        getTankGraphicsPath: function(startPoint, length, pathWidth, pathDepth, whole) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = new PerfectWidgets.Framework.DataObjects.Vector(startPoint.x + length, startPoint.y);
            var $2 = new PerfectWidgets.Framework.DataObjects.Vector(0, pathWidth / 2);
            $0.startPath(startPoint.add($2));
            $0.addLine($1.add($2));
            if (Math.abs(pathDepth) > 0.01) {
                var $5 = new PerfectWidgets.Framework.DataObjects.Vector(pathDepth, Math.abs(pathWidth));
                var $6 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($1.x - $5.x / 2, $1.y - $5.y / 2, $5.x, $5.y).getPositiveRectangle();
                $0.setBounds($6);
                if ((Math.abs($6.width) > PerfectWidgets.Framework.Utilities.MathHelper.epsilon) && (Math.abs($6.height) > PerfectWidgets.Framework.Utilities.MathHelper.epsilon)) {
                    if (whole) {
                        $0.addArc($6, 90, -180);
                    } else {
                        $0.addArc($6, 90, 180);
                    }
                }
            } else {
                $0.addLine($1.minus($2));
            }
            $0.addLine(startPoint.minus($2));
            var $3 = new PerfectWidgets.Framework.DataObjects.Vector(Math.abs(pathWidth), Math.abs(pathWidth));
            var $4 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(startPoint.x - $3.x / 2, startPoint.y - $3.y / 2, $3.x, $3.y).getPositiveRectangle();
            if ((Math.abs($4.width) > PerfectWidgets.Framework.Utilities.MathHelper.epsilon) && (Math.abs($4.height) > PerfectWidgets.Framework.Utilities.MathHelper.epsilon)) {
                $0.addArc($4, -90, -180);
            }
            $0.terminate();
            return $0;
        },
        getTankTopPath: function(endPoint, depth, width, tankWidth) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            if (Math.abs(depth) > 0.01) {
                var $1 = new PerfectWidgets.Framework.DataObjects.Vector(depth, width);
                var $2 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(endPoint.x - $1.x / 2, endPoint.y - $1.y / 2, $1.x, $1.y);
                $0.startPath($2.getLeftCenter());
                $0.addArc($2, -180, 180);
                $1 = new PerfectWidgets.Framework.DataObjects.Vector(depth - tankWidth * depth / width, width - tankWidth);
                var $3 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(endPoint.x - $1.x / 2, endPoint.y - $1.y / 2, $1.x, $1.y);
                $0.addLine($3.getRightCenter());
                $0.addArc($3, 0, -180);
                $0.addArc($3, -180, -180);
                $0.addLine($2.getRightCenter());
                $0.addArc($2, 0, 180);
                $0.terminate();
            }
            return $0;
        },
        drawTank: function(painter, wholeFill) {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = PerfectWidgets.Model.BaseElements._ElementPainter.$0(this);
                var $2 = PerfectWidgets.Model.BaseElements._ElementPainter.$1(this);
                var $3 = Math.min($2, this.getSmartValue(this.getValue(), $2));
                var $4 = $0.valueToPoint($1, this.getDistance());
                var $5 = $0.valueToPoint($2, this.getDistance());
                var $6 = $0.valueToPercent($3);
                if (Math.abs(this.getWidth()) > PerfectWidgets.Framework.Utilities.MathHelper.epsilon) {
                    var $7 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getTransformMatrix($4, Math.PI / 2 - $5.minus($4).getRotation());
                    var $8 = $4.minus($5).getLength();
                    var $9 = $8 * $6;
                    var $A = new PerfectWidgets.Framework.DataObjects.Vector($4.x + $8, $4.y);
                    var $B = new PerfectWidgets.Framework.DataObjects.Vector($4.x + $9, $4.y);
                    var $C = this.getDepth() - this.getTankWidth() * this.getDepth() / this.getWidth();
                    var $D = new PerfectWidgets.Framework.DataObjects.Vector(this.getDepth(), this.getWidth());
                    var $E = new PerfectWidgets.Framework.DataObjects.VectorRectangle($A.x - $D.x / 2, $A.y - $D.y / 2, $D.x, $D.y);
                    var $F = new PerfectWidgets.Framework.DataObjects.Vector($C, Math.abs(this.getWidth() - this.getTankWidth()));
                    var $10 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($B.x - $F.x / 2, $B.y - $F.y / 2, $F.x, $F.y);
                    var $11 = (wholeFill != null) ? wholeFill : new PerfectWidgets.Framework.Drawing.SolidFill(this.getTankColor());
                    var $12 = (wholeFill != null) ? wholeFill : new PerfectWidgets.Framework.Drawing.SolidFill(PerfectWidgets.Framework.Drawing.GraphicsUtilites.scaleColor(this.getTankColor(), 0.8));
                    var $13 = (wholeFill != null) ? null : new PerfectWidgets.Framework.Drawing.SolidFill(this.getLiquidColor());
                    var $14 = (wholeFill != null) ? null : new PerfectWidgets.Framework.Drawing.SolidFill(PerfectWidgets.Framework.Drawing.GraphicsUtilites.scaleColor(this.getLiquidColor(), 0.8));
                    var $15 = (wholeFill != null) ? wholeFill : new PerfectWidgets.Framework.Drawing.SolidFill(PerfectWidgets.Framework.Drawing.GraphicsUtilites.scaleColor(this.getTankColor(), 0.8));
                    var $16 = (wholeFill != null) ? null : PerfectWidgets.Model.BaseElements._ElementPainter.$4($4, $5, this.getEffect3D());
                    var $17 = (wholeFill != null) ? null : this.getStroke();
                    var $18 = this.getTankGraphicsPath($4, $8, this.getWidth(), this.getDepth(), false);
                    var $19 = this.getTankGraphicsPath($4, $9, this.getWidth() - this.getTankWidth(), $C, false);
                    var $1A = this.getTankTopPath($A, this.getDepth(), this.getWidth(), this.getTankWidth());
                    this.setSuffix('_rotation');
                    painter.startTransformation($7);
                    this.setSuffix('tank');
                    if (this.getEffect3D() !== 2) {
                        painter.drawGraphicsPath($12, $17, $18);
                    } else {
                        painter.drawGraphicsPath($11, $17, $18);
                    }
                    if ($6 > 0) {
                        this.setSuffix('liquid');
                        if (this.getEffect3D() !== 2) {
                            painter.drawGraphicsPath($14, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $19);
                        } else {
                            painter.drawGraphicsPath($13, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $19);
                        }
                    }
                    this.setSuffix('top');
                    painter.drawEllipse($11, $17, $E);
                    if ($6 > 0) {
                        this.setSuffix('ellipse');
                        painter.drawEllipse($13, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $10);
                    }
                    this.setSuffix('topSide');
                    if (this.getEffect3D() !== 2) {
                        painter.drawGraphicsPath($15, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $1A);
                    } else {
                        painter.drawGraphicsPath($11, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $1A);
                    }
                    this.setSuffix('3D');
                    painter.drawGraphicsPath($16, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $18);
                    painter.endTransformation();
                }
            }
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                this.setSuffix('_tank');
                painter.createGroup();
                painter.clearGroup();
                this.drawTank(painter, null);
                painter.endGroup();
            }
        },
        $2A: function() {
            var $0 = [];
            var $1 = this.getScale();
            var $2 = PerfectWidgets.Model.BaseElements._ElementPainter.$0(this);
            var $3 = PerfectWidgets.Model.BaseElements._ElementPainter.$1(this);
            var $4 = Math.min($3, this.getSmartValue(this.getValue(), $3));
            var $5 = $1.valueToPoint($2, this.getDistance());
            var $6 = $1.valueToPoint($3, this.getDistance());
            var $7 = $1.valueToPercent($4);
            var $8 = this.getWidth();
            var $9 = this.getDepth();
            var $A = this.getTankWidth();
            var $B = $5.minus($6).getLength();
            var $C = $B * $7;
            var $D = new PerfectWidgets.Framework.DataObjects.Vector($5.x + $B, $5.y);
            var $E = new PerfectWidgets.Framework.DataObjects.Vector($5.x + $C, $5.y);
            var $F = $9 - $A * $9 / $8;
            var $10 = new PerfectWidgets.Framework.DataObjects.Vector($9, $8);
            var $11 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($D.x - $10.x / 2, $D.y - $10.y / 2, $10.x, $10.y);
            var $12 = new PerfectWidgets.Framework.DataObjects.Vector($F, Math.abs($8 - $A));
            var $13 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($E.x - $12.x / 2, $E.y - $12.y / 2, $12.x, $12.y);
            var $14 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getTransformMatrix($5, Math.PI / 2 - $6.minus($5).getRotation());
            var $15 = new PerfectWidgets.Framework.Transformation.MatrixTransformation($14);
            var $16 = this.getTankGraphicsPath($5, $C, $8 - $A, $F, false);
            var $17 = this.getTankTopPath($D, $9, $8, $A);
            var $18 = new Array(4);
            $6 = new PerfectWidgets.Framework.DataObjects.Vector($5.x + $B, $5.y);
            var $19 = new PerfectWidgets.Framework.DataObjects.Vector(0, $8 / 2);
            $18[0] = $5.add($19);
            $18[1] = $6.add($19);
            $18[2] = $6.minus($19);
            $18[3] = $5.minus($19);
            $0.add(this.$2B($18, $15));
            if (Math.abs($9) > 0.01) {
                var $1C = new PerfectWidgets.Framework.DataObjects.Vector($9, Math.abs($8));
                var $1D = new PerfectWidgets.Framework.DataObjects.VectorRectangle($6.x - $1C.x / 2, $6.y - $1C.y / 2, $1C.x, $1C.y).getPositiveRectangle();
                if ((Math.abs($1D.width) > PerfectWidgets.Framework.Utilities.MathHelper.epsilon) && (Math.abs($1D.height) > PerfectWidgets.Framework.Utilities.MathHelper.epsilon)) {
                    $0.add(this.$2B($1D.getVertice(), $15));
                }
            }
            var $1A = new PerfectWidgets.Framework.DataObjects.Vector(Math.abs($8), Math.abs($8));
            var $1B = new PerfectWidgets.Framework.DataObjects.VectorRectangle($5.x - $1A.x / 2, $5.y - $1A.y / 2, $1A.x, $1A.y).getPositiveRectangle();
            if ((Math.abs($1B.width) > PerfectWidgets.Framework.Utilities.MathHelper.epsilon) && (Math.abs($1B.height) > PerfectWidgets.Framework.Utilities.MathHelper.epsilon)) {
                $0.add(this.$2B($1B.getVertice(), $15));
            }
            return $0;
        },
        $2B: function($p0, $p1) {
            var $0 = new Array($p0.length);
            for (var $1 = 0; $1 < $p0.length; $1++) {
                $0[$1] = $p1.apply($p0[$1]);
            }
            return $0;
        },
        getHitTest: function(point) {
            var $0 = this.$2A();
            for (var $1 = 0; $1 < $0.length; $1++) {
                if (PerfectWidgets.Framework.Geometry.GeometryUtilities.isIncludePoint($0[$1], point)) {
                    return true;
                }
            }
            return PerfectWidgets.Model.BaseElements.Tank.callBaseMethod(this, 'getHitTest', [point]);
        },
        getSize: function() {
            return 0;
        }
    }
    PerfectWidgets.Model.BaseElements.ToolTipElement = function() {
        PerfectWidgets.Model.BaseElements.ToolTipElement.initializeBase(this);
        this.$24 = PerfectWidgets.Framework.Drawing.Color.ivory;
        this.$25 = PerfectWidgets.Framework.Drawing.Color.black;
        this.$26 = PerfectWidgets.Framework.Drawing.Color.black;
        this.$27 = PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 0, 0, 64);
        this.$28 = new PerfectWidgets.Framework.Drawing.SolidFill(this.$24);
        this.$29 = new PerfectWidgets.Framework.Drawing.SolidFill(this.$27);
        this.$2A = new PerfectWidgets.Framework.Drawing.SolidFill(this.$25);
        this.$2B = new PerfectWidgets.Framework.Drawing.Stroke();
        this.$2B.setColor(this.$26);
        this.$2B.setStyle(PerfectWidgets.Framework.Drawing.LineStyle.solid);
        this.$2B.setWidth(2);
        this.$2D = '!!!';
        this.setSize(new PerfectWidgets.Framework.DataObjects.Vector(200, 60));
        this.setStroke(this.$2B);
        this.setFill(this.$29);
        this.setName('toolTipBox');
        this.setCenter(new PerfectWidgets.Framework.DataObjects.Vector(100, 10));
        this.$23 = new PerfectWidgets.Drawing.Font();
        var $0 = new PerfectWidgets.Framework.Drawing.FontFamily();
        $0.name = 'Arial';
        this.$23.fontFamily = $0;
        this.$23.sizeInPoints = 8;
        this.$23.style = 0;
    }
    PerfectWidgets.Model.BaseElements.ToolTipElement.prototype = {
        $23: null,
        $24: null,
        $25: null,
        $26: null,
        $27: null,
        $28: null,
        $29: null,
        $2A: null,
        $2B: null,
        $2C: false,
        getNeedToolTip: function() {
            return this.$2C;
        },
        setNeedToolTip: function(needToolTipValue) {
            this.$2C = needToolTipValue;
        },
        $2D: null,
        getCurrentText: function() {
            return this.$2D + '';
        },
        setCurrentText: function(currentTextValue) {
            this.setNeedRepaint(true);
            this.$2D = currentTextValue + '';
            this.setSize(new PerfectWidgets.Framework.DataObjects.Vector(this.$2D.length * 20 + 20, this.getSize().y));
        },
        $2E: null,
        getLocation: function() {
            this.$2E = this.getBounds().getLocation();
            return this.$2E;
        },
        setLocation: function(locationValue) {
            this.setNeedRepaint(true);
            this.$2E = locationValue;
            this.setCenter(this.$2E.add(this.getSize().multiplyByNumber(0.5)));
        },
        $2F: function($p0) {
            var $0 = this.getBounds();
            var $1 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(this.getLocation().getX() + 5, this.getLocation().getY() + 5, this.getSize().getX(), this.getSize().getY());
            this.setSuffix('shadow');
            $p0.drawRectangle(this.$29, PerfectWidgets.Framework.Drawing.Stroke.emptyStroke, $1, 0);
            this.setSuffix('back');
            $p0.drawRectangle(this.$28, this.$2B, $0, 0);
            this.setSuffix('txt');
            $p0.drawText(this.$2D, this.$23, this.$2A, this.getCenter(), 0, 1);
        },
        drawContent: function(painter, fill, stroke) {
            painter.setContext(this);
            painter.clearGroup();
            if (this.$2C && !!this.$2D) {
                this.$2F(painter);
                this.$2C = false;
            }
        },
        onMouseMove: function() {},
        onMouseLeave: function() {}
    }
    PerfectWidgets.Model.BaseElements.TrialLabel = function() {
        this.$23 = new PerfectWidgets.Framework.Drawing.Margins(0, 0, 0, 0);
        PerfectWidgets.Model.BaseElements.TrialLabel.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.TrialLabel.prototype = {
        getMargins: function() {
            return this.$23;
        },
        setMargins: function(marginsValue) {
            this.$23 = marginsValue;
        },
        $24: 0,
        getTextAlign: function() {
            return this.$24;
        },
        setTextAlign: function(textAlignValue) {
            if (this.$24 !== textAlignValue) {
                this.$24 = textAlignValue;
            }
        },
        $25: null,
        getFont: function() {
            return this.$25;
        },
        setFont: function(font) {
            if (this.$25 !== font) {
                this.$25 = font;
            }
        },
        $26: null,
        getText: function() {
            return this.$26 + '';
        },
        setText: function(textValue) {
            this.$26 = textValue + '';
            this.setNeedRepaint(true);
        },
        drawContent: function(painter, fill, stroke) {
            if (this.getFont() != null) {
                this.setSuffix('.0');
                painter.drawRectangle(new PerfectWidgets.Framework.Drawing.EmptyFill(), stroke, this.getBounds(), 0);
                this.setSuffix('.1');
                var $0 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(this.getBounds().getLeft() + this.getMargins().left, this.getBounds().getTop() + this.getMargins().top, this.getBounds().width - this.getMargins().left - this.getMargins().right, this.getBounds().height - this.getMargins().top - this.getMargins().bottom);
                painter.drawAlignedText(this.getText(), this.getFont(), fill, $0, 0, this.getTextAlign());
            }
        },
        getHitTest: function(point) {
            return false;
        }
    }
    PerfectWidgets.Model.BaseElements.CustomLabels = function() {
        this.$3A = [];
        PerfectWidgets.Model.BaseElements.CustomLabels.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.CustomLabels.prototype = {
        getLabels: function() {
            return this.$3A;
        },
        setLabels: function(labels) {
            this.$3A = labels;
        },
        getLabelsCount: function() {
            return this.$3A.length;
        },
        getObjectByIndex: function(index) {
            var $0 = this.$3A[index].getText();
            if ($0 == null || !$0.length) {
                return this.getValueByIndex(index);
            } else {
                return $0;
            }
        },
        getValueByIndex: function(index) {
            var $0 = this.$3A[index];
            var $1 = this.$3A[index].getValue();
            var $2 = this.getScale();
            var $3 = this.getOrigin();
            var $4 = 0;
            switch ($1.getKind()) {
                case 1:
                    $4 = $1.getValue();
                    break;
                case 2:
                    if ($2 != null) {
                        $4 = $2.percentToValue($1.getValue() / 100);
                    }
                    break;
                case 0:
                    var $5 = false;
                    if (!$3.getKind() || ($3.getKind() === 2 && !$3.getValue())) {
                        $5 = true;
                    } else if ($2 != null && ($3.getKind() === 1 && $3.getValue() === $2.getMinimum())) {
                        $5 = true;
                    }
                    var $6 = this.$3B();
                    var $7 = $6;
                    if ($7 > 1 && $5) {
                        $7--;
                    }
                    if ($2 != null) {
                        if (!$3.getKind() && $6 === 1) {
                            $4 = $2.percentToValue(0.5);
                        } else {
                            var $8 = $2.getMaximum() - $2.getMinimum();
                            var $9 = this.$3C($0);
                            $4 = PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue($2, $3, $8) + $8 / $7 * $9;
                        }
                    }
                    break;
            }
            return $4;
        },
        $3B: function() {
            var $0 = 0;
            var $enum1 = ss.IEnumerator.getEnumerator(this.$3A);
            while ($enum1.moveNext()) {
                var $1 = $enum1.current;
                if (!$1.getValue().getKind()) {
                    $0++;
                }
            }
            return $0;
        },
        $3C: function($p0) {
            var $0 = 0;
            if ($p0 == null || !this.$3A.contains($p0)) {
                return -1;
            }
            var $1 = this.$3A.indexOf($p0);
            for (var $2 = 0; $2 < $1; $2++) {
                if (!this.$3A[$2].getValue().getKind()) {
                    $0++;
                }
            }
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.DockableTrajectoryBase = function() {
        this.$24 = PerfectWidgets.Framework.Drawing.Margins.empty;
        PerfectWidgets.Model.BaseElements.DockableTrajectoryBase.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.DockableTrajectoryBase.prototype = {
        $25: function($p0, $p1) {
            var $0 = 0;
            var $1 = Type.safeCast($p0, PerfectWidgets.Model.BaseElements.Composite);
            var $2 = $1.getElements();
            if ($1 != null) {
                switch ($p1) {
                    case 3:
                        for (var $3 = 0; $3 < $2.count(); $3++) {
                            var $4 = $2.get_item($3);
                            var $5 = Type.safeCast($4, PerfectWidgets.Model.BaseElements.IScaleElement);
                            if ($5 != null && $5.getDock() === 3 && $5.getVisible()) {
                                $0 = Math.max($0, $5.getSize());
                            }
                        }
                        break;
                    case 2:
                    case 1:
                        for (var $6 = 0; $6 < $2.count(); $6++) {
                            var $7 = $2.get_item($6);
                            var $8 = Type.safeCast($7, PerfectWidgets.Model.BaseElements.IScaleElement);
                            if ($8 != null && $8.getDock() === $p1 && $8.getVisible()) {
                                $0 += $8.getSize() + $8.getPadding();
                            }
                        }
                        $0 += this.$25($p0, 3) / 2;
                        break;
                }
            }
            return $0;
        },
        $26: function($p0) {
            var $0 = 0;
            var $1 = this.getElements();
            for (var $2 = 0; $2 < $1.count(); $2++) {
                var $3 = $1.get_item($2);
                var $4 = Type.safeCast($3, PerfectWidgets.Model.BaseElements.IScale);
                if ($4 != null) {
                    $0 = Math.max($0, this.$25($4, $p0));
                }
            }
            return $0;
        },
        getInsideSize: function() {
            return this.$26(1);
        },
        getOutsideSize: function() {
            return this.$26(2);
        },
        getMargins: function() {
            return this.$24;
        },
        setMargin: function(value) {
            if (this.$24 !== value) {
                this.$24 = value;
            }
        }
    }
    PerfectWidgets.Model.BaseElements._ElementPainter = function() {}
    PerfectWidgets.Model.BaseElements._ElementPainter.$0 = function($p0) {
        var $0 = PerfectWidgets.Model.BaseElements._ElementPainter.$3($p0);
        if ($0 != null) {
            return PerfectWidgets.Model.BaseElements._ElementPainter.$2($p0.getMinLimit(), $0.getMinimum(), $p0);
        }
        return 0;
    }
    PerfectWidgets.Model.BaseElements._ElementPainter.$1 = function($p0) {
        var $0 = PerfectWidgets.Model.BaseElements._ElementPainter.$3($p0);
        if ($0 != null) {
            return PerfectWidgets.Model.BaseElements._ElementPainter.$2($p0.getMaxLimit(), $0.getMaximum(), $p0);
        }
        return 0;
    }
    PerfectWidgets.Model.BaseElements._ElementPainter.$2 = function($p0, $p1, $p2) {
        var $0 = PerfectWidgets.Model.BaseElements._ElementPainter.$3($p2);
        if ($0 != null) {
            switch ($p0._kind) {
                case 0:
                    return $p1;
                case 1:
                    return $p0._value;
                case 2:
                    return $0.percentToValue($p0._value / 100);
            }
        }
        return $p1;
    }
    PerfectWidgets.Model.BaseElements._ElementPainter.$3 = function($p0) {
        var $0 = $p0;
        while ($0 != null) {
            if (Type.canCast($0, PerfectWidgets.Model.BaseElements.IScale)) {
                return $0;
            }
            $0 = $0.getParent();
        }
        return null;
    }
    PerfectWidgets.Model.BaseElements._ElementPainter.$4 = function($p0, $p1, $p2) {
        if ($p2 !== 2) {
            var $0 = new PerfectWidgets.Framework.Drawing.MultiGradientFill();
            var $1 = $p1.minus($p0).getRotation();
            if (($1 < 5 * Math.PI / 4) && ($1 >= Math.PI / 4)) {
                $0.setAngle(270);
            } else {
                $0.setAngle(90);
            }
            if (!$p2) {
                var $2 = new PerfectWidgets.Framework.Drawing.GradientColorCollection();
                $2.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 0, 0, 0), 0));
                $2.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(0, 0, 0, 0), 0.25));
                $2.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(30, 0, 0, 0), 0.5));
                $2.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(100, 0, 0, 0), 1));
                $0.setColors($2);
            } else {
                var $3 = new PerfectWidgets.Framework.Drawing.GradientColorCollection();
                $3.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 153, 153, 153), 0));
                $3.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 51, 51, 51), 0.13));
                $3.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 0, 0, 0), 0.43));
                $3.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 0, 0, 0), 0.55));
                $3.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 178, 178, 178), 0.9));
                $3.add(new PerfectWidgets.Framework.Drawing.GradientColor(PerfectWidgets.Framework.Drawing.Color.fromArgb(128, 76, 76, 76), 1));
                $0.setColors($3);
            }
            return $0;
        }
        return null;
    }
    PerfectWidgets.Model.BaseElements.Ellipse = function() {
        PerfectWidgets.Model.BaseElements.Ellipse.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Ellipse.prototype = {
        drawContent: function(painter, fill, stroke) {
            painter.drawEllipse(fill, stroke, this.getBounds());
        },
        getHitTest: function(point) {
            var $0 = this.getRealPosition(point);
            var $1 = this._size.x / 2;
            var $2 = this._size.y / 2;
            var $3 = PerfectWidgets.Framework.Geometry.GeometryUtilities.rotateVector($0, this.getBounds().getCenter(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(-this._angle)).minus(this.getBounds().getCenter());
            var $4 = $3.x * $3.x / $1 / $1 + $3.y * $3.y / $2 / $2;
            return $4 <= 1;
        }
    }
    PerfectWidgets.Model.BaseElements.Gear = function() {
        PerfectWidgets.Model.BaseElements.Gear.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Gear.prototype = {
        $23: 5,
        $24: 20,
        $25: 1,
        $26: 0.001,
        getCount: function() {
            return this.$23;
        },
        setCount: function(count) {
            if (count < 0) {
                throw new Error('value is negative');
            }
            if (this.$23 !== count) {
                this.$23 = count;
                this.setNeedRepaint(true);
            }
        },
        getDepth: function() {
            return this.$24;
        },
        setDepth: function(depth) {
            if (this.$24 !== depth) {
                this.$24 = depth;
                this.setNeedRepaint(true);
            }
        },
        getDimensionsRatio: function() {
            return this.$25;
        },
        setDimensionsRatio: function(ratio) {
            if (this.$25 !== ratio) {
                this.$25 = ratio;
                this.setNeedRepaint(true);
            }
        },
        $27: function() {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(this.getCenter().x - this.getRadius(), this.getCenter().y - this.getRadius(), this.getRadius() * 2, this.getRadius() * 2);
            var $2 = 360 / this.getCount();
            var $3 = $2 * this.getDimensionsRatio() / (this.getDimensionsRatio() + 1);
            var $4 = $2 - $3;
            var $5 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getRadius() - this.getDepth(), PerfectWidgets.Framework.DataObjects.Vector.toRadians($4 / 2));
            var $6 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getRadius(), PerfectWidgets.Framework.DataObjects.Vector.toRadians($4));
            var $7 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getRadius(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(0));
            var $8 = $7.minus($6).getLength();
            var $9 = $5.minus($7).getLength();
            var $A = $5.minus($6).getLength();
            var $B = ($8 + $9 + $A) / 2;
            var $C = Math.sqrt($B * ($B - $8) * ($B - $9) * ($B - $A));
            var $D = ($8 * $9 * $A) / (4 * $C);
            var $E = this.getRadius() - this.getDepth() + $D;
            var $F = new PerfectWidgets.Framework.DataObjects.Vector($D * 2, $D * 2);
            var $10 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar($E, PerfectWidgets.Framework.DataObjects.Vector.toRadians($4 / 2));
            var $11 = PerfectWidgets.Framework.DataObjects.Vector.toDegrees($7.minus($10).getRotation());
            var $12 = (PerfectWidgets.Framework.DataObjects.Vector.toDegrees($6.minus($10).getRotation()) - $11);
            for (var $14 = 0; $14 < this.getCount(); $14++) {
                var $15 = this.getAngle() + $2 * $14;
                var $16 = new PerfectWidgets.Framework.DataObjects.Vector($1.width / 2, $1.height / 2);
                var $17 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint($1.getCenter(), $16, $15);
                var $18 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint($1.getCenter(), $16, $15 + $3);
                var $19 = this.getCenter().add(PerfectWidgets.Framework.DataObjects.Vector.fromPolar($E, PerfectWidgets.Framework.DataObjects.Vector.toRadians($15 + ($2 + $3) / 2)));
                var $1A = $19.minus($F.divideByNumber(2));
                var $1B = new PerfectWidgets.Framework.DataObjects.VectorRectangle($1A.x, $1A.y, $F.x, $F.y);
                var $1C = new PerfectWidgets.Framework.DataObjects.Vector($1B.width / 2, $1B.height / 2);
                var $1D = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint($1B.getCenter(), $1C, $11 + $15 + $3);
                var $1E = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint($1B.getCenter(), $1C, $11 + $15 + $3 + $12);
                if (!$14) {
                    $0.startPath($17);
                }
                var $1F = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
                $1F.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector($17));
                $0.addPathElement($1F);
                var $20 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
                var $21 = PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillParameters($1, $15, $3);
                $20.add($21);
                $0.addPathElement($20);
                $1F = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
                $1F.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector($1D));
                $0.addPathElement($1F);
                $20 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
                $21 = PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillParameters($1B, $11 + $15 + $3, $12);
                $20.add($21);
                $0.addPathElement($20);
            }
            $0.terminate();
            var $13 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(this._center.x - this._radius, this._center.y - this._radius, 2 * this._radius, 2 * this._radius);
            $0.setBounds($13);
            return $0;
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                if (Math.abs(this.getRadius()) > this.$26) {
                    this.setSuffix('gear_');
                    painter.createGroup();
                    painter.clearGroup();
                    painter.drawGraphicsPath(fill, stroke, this.$27());
                    painter.endGroup();
                }
            }
        },
        getHitTest: function(point) {
            var $0 = this.getRealPosition(point);
            if (this.getBoundedBox().contains($0)) {
                var $1 = $0.minus(this._center);
                return $1.abs() <= this._radius;
            }
            return false;
        },
        getBoundedBox: function() {
            var $0 = Math.max(this.getRadius(), this.getRadius() - this.getDepth());
            var $1 = new PerfectWidgets.Framework.DataObjects.Vector($0 * 2, $0 * 2);
            var $2 = this.getCenter().minus($1.divideByNumber(2));
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle($2.x, $2.y, $1.x, $1.y);
        }
    }
    PerfectWidgets.Model.BaseElements.Guide = function() {
        PerfectWidgets.Model.BaseElements.Guide.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Guide.prototype = {
        $27: null,
        getStartPoint: function() {
            return this.$27;
        },
        setStartPoint: function(startPointValue) {
            this.$27 = startPointValue;
        },
        $28: null,
        getEndPoint: function() {
            return this.$28;
        },
        setEndPoint: function(endPointValue) {
            this.$28 = endPointValue;
        },
        $29: 0,
        getGuideDirection: function() {
            return this.$29;
        },
        setGuideDirection: function(guideDirectionValue) {
            if (this.$29 !== guideDirectionValue) {
                this.$29 = guideDirectionValue;
            }
        },
        $2A: 0,
        getAlign: function() {
            return this.$2A;
        },
        setAlign: function(alignValue) {
            this.$2A = alignValue;
        },
        $2B: function($p0, $p1, $p2, $p3) {
            var $0 = $p1.minus($p0);
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar($p3, $0.getRotation() + Math.PI / 2);
            $0.setLength($0.getLength() * $p2);
            return $0.add($p0).add($1);
        },
        percentToPoint: function(portion, radius) {
            return this.$2B(this.getStartPoint(), this.getEndPoint(), portion, radius);
        },
        $2C: function($p0, $p1, $p2) {
            if (Math.abs(this.getEndPoint().x - $p0.x) <= 0.0001) {
                return (($p2.y - $p0.y) / ($p1.y - $p0.y));
            }
            var $0 = ($p2.getProjection($p0, $p1).x - $p0.x);
            return $0 / ($p1.x - $p0.x);
        },
        pointToPercent: function(point) {
            return this.$2C(this.getStartPoint(), this.getEndPoint(), point);
        },
        getBoundedBox: function() {
            var $0 = this.$28.minus(this.$27);
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle(this.$27.x, this.$27.y, $0.x, $0.y);
        },
        recalculatePosition: function() {
            var $0 = this.getInstrument();
            if ($0 != null) {
                var $1 = PerfectWidgets.Framework.DataObjects.VectorRectangle.shrink($0.getBoundedBox(), this.getMargins());
                switch (this.getGuideDirection()) {
                    case 3:
                        this.$30($1);
                        return;
                    case 4:
                        this.$2F($1);
                        return;
                    case 1:
                        this.$2E($1);
                        return;
                    case 2:
                        this.$2D($1);
                        return;
                }
            }
        },
        $2D: function($p0) {
            var $0 = 0;
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.empty;
            switch (this.getAlign()) {
                case 2:
                    this.setStartPoint($p0.getTopCenter());
                    this.setEndPoint($p0.getBottomCenter());
                    break;
                case 0:
                    $0 = Math.max(this.getInsideSize(), -this.getOutsideSize());
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector($0, 0);
                    this.setStartPoint($p0.getTopRight().minus($1));
                    this.setEndPoint($p0.getBottomRight().minus($1));
                    break;
                case 1:
                    $0 = Math.max(this.getOutsideSize(), -this.getInsideSize());
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector($0, 0);
                    this.setStartPoint($p0.getTopLeft().add($1));
                    this.setEndPoint($p0.getBottomLeft().add($1));
                    break;
            }
        },
        $2E: function($p0) {
            var $0 = 0;
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.empty;
            switch (this.getAlign()) {
                case 2:
                    this.setStartPoint($p0.getBottomCenter());
                    this.setEndPoint($p0.getTopCenter());
                    break;
                case 0:
                    $0 = Math.max(this.getOutsideSize(), -this.getInsideSize());
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector($0, 0);
                    this.setStartPoint($p0.getBottomRight().minus($1));
                    this.setEndPoint($p0.getTopRight().minus($1));
                    break;
                case 1:
                    $0 = Math.max(this.getInsideSize(), -this.getOutsideSize());
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector($0, 0);
                    this.setStartPoint($p0.getBottomLeft().add($1));
                    this.setEndPoint($p0.getTopLeft().add($1));
                    break;
            }
        },
        $2F: function($p0) {
            var $0 = 0;
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.empty;
            switch (this.getAlign()) {
                case 2:
                    this.setStartPoint($p0.getRightCenter());
                    this.setEndPoint($p0.getLeftCenter());
                    break;
                case 0:
                    $0 = Math.max(this.getInsideSize(), -this.getOutsideSize());
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector(0, $0);
                    this.setStartPoint($p0.getBottomRight().minus($1));
                    this.setEndPoint($p0.getBottomLeft().minus($1));
                    break;
                case 1:
                    $0 = Math.max(this.getOutsideSize(), -this.getInsideSize());
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector(0, $0);
                    this.setStartPoint($p0.getTopRight().add($1));
                    this.setEndPoint($p0.getTopLeft().add($1));
                    break;
            }
        },
        $30: function($p0) {
            var $0 = 0;
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.empty;
            switch (this.getAlign()) {
                case 2:
                    this.setStartPoint($p0.getLeftCenter());
                    this.setEndPoint($p0.getRightCenter());
                    break;
                case 0:
                    $0 = Math.max(this.getOutsideSize(), -this.getInsideSize());
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector(0, $0);
                    this.setStartPoint($p0.getBottomLeft().minus($1));
                    this.setEndPoint($p0.getBottomRight().minus($1));
                    break;
                case 1:
                    $0 = Math.max(this.getInsideSize(), -this.getOutsideSize());
                    $1 = new PerfectWidgets.Framework.DataObjects.Vector(0, $0);
                    this.setStartPoint($p0.getTopLeft().add($1));
                    this.setEndPoint($p0.getTopRight().add($1));
                    break;
            }
        },
        portionToTransformation: function(portion) {
            var $0 = new PerfectWidgets.Framework.Transformation.TranslateTransformation();
            var $1 = this.$28.minus(this.$27);
            $1.setLength($1.getLength() * portion);
            $0.setTranslation($1);
            return $0;
        },
        getStartDistance: function() {
            return 0;
        }
    }
    PerfectWidgets.Model.BaseElements.Highlight = function() {
        PerfectWidgets.Model.BaseElements.Highlight.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Highlight.prototype = {
        $23: 100,
        getSweepAngle: function() {
            return this.$23;
        },
        setSweepAngle: function(sweepAngleValue) {
            if (this.$23 !== sweepAngleValue) {
                this.$23 = (Math.abs(sweepAngleValue) <= 0.0001) ? 360 : sweepAngleValue;
                this.setNeedRepaint(true);
            }
        },
        _k: 0,
        getK: function() {
            return this._k;
        },
        setK: function(kValue) {
            if (this._k !== kValue) {
                this._k = kValue;
                this.setNeedRepaint(true);
            }
        },
        $24: function() {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getRadius(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getAngle()));
            var $2 = new PerfectWidgets.Framework.DataObjects.Vector(this.getCenter().x + $1.x, this.getCenter().y + $1.y);
            $0.startPath($2);
            $1 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getRadius(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getAngle() + this.getSweepAngle()));
            var $3 = new PerfectWidgets.Framework.DataObjects.Vector(this.getCenter().x + $1.x, this.getCenter().y + $1.y);
            var $4 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(this.getCenter().x - this.getRadius(), this.getCenter().y - this.getRadius(), this.getRadius() * 2, this.getRadius() * 2);
            var $5 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            var $6 = PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillParameters($4, this.getAngle(), this.getSweepAngle());
            $5.add($6);
            $0.addPathElement($5);
            if (this.getSweepAngle() < 360) {
                var $7 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this.getK() * this.getRadius(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getAngle() + this.getSweepAngle() / 2));
                var $8 = new PerfectWidgets.Framework.DataObjects.Vector(this.getCenter().x - $7.x, this.getCenter().y - $7.y);
                var $9 = new PerfectWidgets.Framework.DataObjects.Vector($8.x - $2.x, $8.y - $2.y);
                var $A = $9.getLength();
                var $B = PerfectWidgets.Framework.DataObjects.Vector.toDegrees($3.minus($8).getRotation());
                var $C = (PerfectWidgets.Framework.DataObjects.Vector.toDegrees($2.minus($8).getRotation()) - $B - 360) % 360;
                $4 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($8.x - $A, $8.y - $A, $A * 2, $A * 2);
                var $D = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
                var $E = PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillParameters($4, $B, $C);
                $D.add($E);
                $0.addPathElement($D);
            }
            $0.terminate();
            return $0;
        },
        $25: 1,
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                if (Math.abs(this.getRadius()) > this.$25) {
                    this.setSuffix('_highlight');
                    painter.createGroup();
                    painter.clearGroup();
                    var $0 = this.$24();
                    var $1 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(this._center.x - this._radius, this._center.y - this._radius, 2 * this._radius, 2 * this._radius);
                    $0.setBounds($1);
                    painter.drawGraphicsPath(fill, stroke, $0);
                    painter.endGroup();
                }
            }
        },
        getHitTest: function(point) {
            return false;
        },
        getBoundedBox: function() {
            var $0 = Math.max(this.getRadius(), this.getRadius() - this.getRadius() * this.getK());
            var $1 = new PerfectWidgets.Framework.DataObjects.Vector($0 * 2, $0 * 2);
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle(this.getCenter().x - $0, this.getCenter().y - $0, $1.x, $1.y);
        }
    }
    PerfectWidgets.Model.BaseElements.Joint = function() {
        this.$27 = PerfectWidgets.Framework.DataObjects.Vector.empty;
        this.$2B = 0;
        PerfectWidgets.Model.BaseElements.Joint.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Joint.prototype = {
        $28: 120,
        $29: 300,
        $2A: 0,
        getCenter: function() {
            return this.$27;
        },
        setCenter: function(value) {
            if (!this.$27.equals(value)) {
                this.$27 = value;
                this.setNeedRepaint(true);
            }
        },
        portionToTransformation: function(portion) {
            var $0 = new PerfectWidgets.Framework.Transformation.RotateTransformation();
            $0.setAngle(this.$29 * portion);
            $0.setCenter(this.$27);
            return $0;
        },
        getStartAngle: function() {
            return this.$28;
        },
        setStartAngle: function(value) {
            value = Math.round((value % 360 + 360) % 360);
            if (this.$28 !== value) {
                this.$28 = value;
                this.setNeedRepaint(true);
            }
        },
        getTotalAngle: function() {
            return this.$29;
        },
        setTotalAngle: function(value) {
            value = Math.round(value % 360);
            value = (!value) ? 359.99 : value;
            if (value !== this.$29) {
                this.$29 = value;
                this.setNeedRepaint(true);
            }
        },
        getRadius: function() {
            return this.$2A;
        },
        setRadius: function(value) {
            if (this.$2A !== value) {
                this.$2A = Math.abs(value);
                this.setNeedRepaint(true);
            }
        },
        getDock: function() {
            return this.$2B;
        },
        setDock: function(value) {
            if (this.$2B !== value) {
                this.$2B = value;
                this.setNeedRepaint(true);
            }
        },
        getStartDistance: function() {
            return this.$2A;
        },
        percentToPoint: function(portion, radius) {
            return this.$27.add(PerfectWidgets.Framework.DataObjects.Vector.fromPolar(radius, PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.$28) + PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.$29) * portion));
        },
        pointToPercent: function(point) {
            var $0 = point.minus(this.$27).getRotation();
            var $1 = Math.PI * 2;
            var $2 = ($0 % $1 + $1) % $1;
            var $3 = PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.$28);
            var $4 = PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.$29);
            var $5 = $2 - $3;
            if (($5 - $4 / 2) > Math.PI) {
                $5 -= $1;
            } else if ((($5 + Math.PI) < ($4 / 2)) && ($5 + $1 < $3 + $4)) {
                $5 += $1;
            }
            return $5 / $4;
        },
        getBoundedBox: function() {
            if (!this.$2A) {
                this.$2A = 1;
            }
            var $0 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(this.$27.x - this.$2A, this.$27.y - this.$2A, this.$2A * 2, this.$2A * 2);
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getStartAngle());
            var $2 = PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getStartAngle() + this.getTotalAngle());
            var $3 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipseRadius($0, $1), $1).add(this.getCenter());
            var $4 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipseRadius($0, $2), $2).add(this.getCenter());
            var $5 = [];
            $5.add($3);
            $5.add($4);
            var $6 = this.getStartAngle();
            var $7 = Math.floor((this.getStartAngle() + this.getTotalAngle()) / 90) - Math.floor(this.getStartAngle() / 90);
            var $8 = ($7 > 0) ? 1 : -1;
            $7 = Math.abs($7);
            var $9 = [];
            for (var $C = 1; $C <= $7; $C++) {
                switch (($8 > 0) ? (Math.floor(this.getStartAngle() / 90 + $8 * $C) * 90 + 360) % 360 / 90 : (Math.ceil(this.getStartAngle() / 90 + $8 * $C) + 360) * 90 % 360 / 90) {
                    case 0:
                        $5.add($0.getRightCenter());
                        break;
                    case 1:
                        $5.add($0.getBottomCenter());
                        break;
                    case 2:
                        $5.add($0.getLeftCenter());
                        break;
                    case 3:
                        $5.add($0.getTopCenter());
                        break;
                    case 4:
                        $5.add($0.getRightCenter());
                        break;
                }
            }
            var $A = $3,
                $B = $4;
            for (var $D = 0; $D < $5.length; $D++) {
                if ($5[$D].x < $A.x) {
                    $A = new PerfectWidgets.Framework.DataObjects.Vector($5[$D].x, $A.y);
                }
                if ($5[$D].y < $A.y) {
                    $A = new PerfectWidgets.Framework.DataObjects.Vector($A.x, $5[$D].y);
                }
                if ($5[$D].x > $B.x) {
                    $B = new PerfectWidgets.Framework.DataObjects.Vector($5[$D].x, $B.y);
                }
                if ($5[$D].y > $B.y) {
                    $B = new PerfectWidgets.Framework.DataObjects.Vector($B.x, $5[$D].y);
                }
            }
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle($A.x, $A.y, $B.x - $A.x, $B.y - $A.y);
        },
        getObject: function(name) {
            if (name.toLowerCase() === 'jointradius') {
                return this.$2A;
            }
            if (name.toLowerCase() === 'jointcenter') {
                return this.$27;
            }
            if (name.toLowerCase() === 'jointtotalangle') {
                return this.$29;
            }
            if (name.toLowerCase() === 'jointstartangle') {
                return this.$28;
            }
            return null;
        },
        recalculatePosition: function() {
            if (this.getInstrument() != null && !!this.$2B) {
                var $0 = this.getOutsideSize();
                var $1 = PerfectWidgets.Framework.DataObjects.VectorRectangle.shrink(this.getInstrument().getBoundedBox(), this.getMargins());
                switch (this.$2B) {
                    case 1:
                        this.$27 = $1.getCenter();
                        this.$2A = Math.min($1.width, $1.height) / 2 - $0;
                        break;
                    case 2:
                        this.$27 = $1.getLeftCenter();
                        this.$2A = Math.min($1.width, $1.height / 2) - $0;
                        break;
                    case 3:
                        this.$27 = $1.getRightCenter();
                        this.$2A = Math.min($1.width, $1.height / 2) - $0;
                        break;
                    case 4:
                        this.$27 = $1.getTopCenter();
                        this.$2A = Math.min($1.width / 2, $1.height) - $0;
                        break;
                    case 5:
                        this.$27 = $1.getBottomCenter();
                        this.$2A = Math.min($1.width / 2, $1.height) - $0;
                        break;
                    case 6:
                        this.$27 = $1.getBottomLeft();
                        this.$2A = Math.min($1.width, $1.height) - $0;
                        break;
                    case 8:
                        this.$27 = $1.getBottomRight();
                        this.$2A = Math.min($1.width, $1.height) - $0;
                        break;
                    case 9:
                        this.$27 = $1.getTopRight();
                        this.$2A = Math.min($1.width, $1.height) - $0;
                        break;
                    case 7:
                        this.$27 = $1.getTopLeft();
                        this.$2A = Math.min($1.width, $1.height) - $0;
                        break;
                }
            }
        }
    }
    PerfectWidgets.Model.BaseElements.Label = function() {
        this.$23 = new PerfectWidgets.Framework.Drawing.Margins(0, 0, 0, 0);
        PerfectWidgets.Model.BaseElements.Label.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Label.prototype = {
        getMargins: function() {
            return this.$23;
        },
        setMargins: function(marginsValue) {
            this.$23 = marginsValue;
            this.setNeedRepaint(true);
        },
        $24: 0,
        getTextAlign: function() {
            return this.$24;
        },
        setTextAlign: function(textAlignValue) {
            if (this.$24 !== textAlignValue) {
                this.$24 = textAlignValue;
                this.setNeedRepaint(true);
            }
        },
        $25: null,
        getFont: function() {
            return this.$25;
        },
        setFont: function(font) {
            if (this.$25 !== font) {
                this.$25 = font;
                this.setNeedRepaint(true);
            }
        },
        $26: null,
        getText: function() {
            return this.$26 + '';
        },
        setText: function(textValue) {
            if (textValue != null && textValue !== this.$26) {
                this.$26 = textValue + '';
                this.setNeedRepaint(true);
            }
        },
        onPaint: function(painter, fill, stroke) {
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                if ((this._angle != null & this._center != null) === 1) {
                    var $0 = new PerfectWidgets.Framework.Transformation.RotateTransformation();
                    $0.setCenter(this._center);
                    $0.setAngle(this._angle);
                    this.setTransformation($0);
                }
                painter.setContext(this);
                this.setSuffix('_label');
                painter.startClip(this.getBoundedBox());
                painter.clearGroup();
                this.drawContent(painter, fill, stroke);
                painter.endClip();
                this.setNeedRepaint(false);
            }
        },
        drawContent: function(painter, fill, stroke) {
            if (this.getFont() != null) {
                this.setSuffix('.0');
                painter.drawRectangle(new PerfectWidgets.Framework.Drawing.EmptyFill(), stroke, this.getBounds(), 0);
                this.setSuffix('.1');
                var $0 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(this.getBounds().getLeft() + this.getMargins().left, this.getBounds().getTop() + this.getMargins().top, this.getBounds().width - this.getMargins().left - this.getMargins().right, this.getBounds().height - this.getMargins().top - this.getMargins().bottom);
                painter.drawAlignedText(this.getText(), this.getFont(), fill, $0, 0, this.getTextAlign());
            }
        }
    }
    PerfectWidgets.Model.BaseElements.LabelInfo = function(text, value, textSize) {
        this.$0 = '';
        this.$2 = PerfectWidgets.Framework.DataObjects.Vector.empty;
        this.$0 = text;
        this.$1 = value;
        this.$2 = textSize;
    }
    PerfectWidgets.Model.BaseElements.LabelInfo.prototype = {
        get_text: function() {
            return this.$0;
        },
        $1: 0,
        get_value: function() {
            return this.$1;
        },
        get_textSize: function() {
            return this.$2;
        }
    }
    PerfectWidgets.Model.BaseElements.LevelBase = function() {
        PerfectWidgets.Model.BaseElements.LevelBase.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.LevelBase.prototype = {
        $24: 0,
        $25: null,
        $26: null,
        $27: null,
        $28: null,
        getDivisions: function() {
            return this.$24;
        },
        setDivisions: function(divisionsValue) {
            if (this.$24 !== divisionsValue) {
                this.$24 = divisionsValue;
                this.setNeedRepaint(true);
            }
        },
        getDivisionsStroke: function() {
            return this.$25;
        },
        setDivisionsStroke: function(stroke) {
            this.$25 = stroke;
            this.setNeedRepaint(true);
        },
        getStartColor: function() {
            return this.$26;
        },
        setStartColor: function(startColorValue) {
            this.$26 = startColorValue;
            this.setNeedRepaint(true);
        },
        getEndColor: function() {
            return this.$27;
        },
        setEndColor: function(endColorValue) {
            this.$27 = endColorValue;
            this.setNeedRepaint(true);
        },
        getColors: function() {
            return this.$28;
        },
        setColors: function(colors) {
            this.$28 = colors;
            this.setNeedRepaint(true);
        },
        onMouseDown: function(args) {
            var $0 = this.getParent();
            var $1 = this.getScale();
            if (this.getHitTest(args.getManipulationOrigin()) && $0 != null && $1 != null) {
                var $2 = $1.pointToValue(args.getManipulationOrigin());
            }
            PerfectWidgets.Model.BaseElements.LevelBase.callBaseMethod(this, 'onMouseDown', [args]);
            this.setNeedRepaint(true);
        }
    }
    PerfectWidgets.Model.BaseElements.Line = function() {
        PerfectWidgets.Model.BaseElements.Line.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Line.prototype = {
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                painter.drawLine(stroke, [this._startPoint, this._endPoint]);
            }
        },
        getHitTest: function(point) {
            var $0 = this.getRealPosition(point);
            return this.isIncludePoint($0, this._startPoint, this._endPoint);
        },
        getBoundedBox: function() {
            var $0 = this._endPoint.minus(this._startPoint);
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle(this._startPoint.x, this._startPoint.y, $0.x, $0.y).getPositiveRectangle();
        }
    }
    PerfectWidgets.Model.BaseElements.LineElement = function() {
        this._startPoint = PerfectWidgets.Framework.DataObjects.Vector.empty;
        this._endPoint = PerfectWidgets.Framework.DataObjects.Vector.empty;
        PerfectWidgets.Model.BaseElements.LineElement.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.LineElement.prototype = {
        isIncludePoint: function(point, sPoint, ePoint) {
            var $0 = 5;
            if (this.getStroke() != null) {
                $0 = Math.max($0, this.getStroke().getWidth() / 2 + 1);
            }
            return PerfectWidgets.Framework.Geometry.GeometryUtilities.isLineIncludePoint(point, sPoint, ePoint, $0);
        },
        getBoundedBox: function() {
            var $0 = this._endPoint.minus(this._startPoint);
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle(this._startPoint.x, this._startPoint.y, $0.x, $0.y).getPositiveRectangle();
        },
        getStartPoint: function() {
            return this._startPoint;
        },
        setStartPoint: function(value) {
            if (!this._startPoint.equals(value)) {
                this._startPoint = value;
                this.setNeedRepaint(true);
            }
        },
        getEndPoint: function() {
            return this._endPoint;
        },
        setEndPoint: function(value) {
            if (this._endPoint !== value) {
                this._endPoint = value;
                this.setNeedRepaint(true);
            }
        }
    }
    PerfectWidgets.Model.BaseElements.Needle = function() {
        this._showMode = 0;
        this._needlePoints = [];
        PerfectWidgets.Model.BaseElements.Needle.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Needle.prototype = {
        _startWidth: 50,
        _endWidth: 0,
        $23: function($p0, $p1, $p2) {
            var $0 = this._endPoint.minus(this._startPoint).multiply(new PerfectWidgets.Framework.DataObjects.Vector($p0, $p0));
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar($p1 / 2, this._startPoint.minus(this._endPoint).getRotation() - Math.PI / 2);
            if ($p2 === 1) {
                return this._startPoint.add($0).add($1);
            }
            return this._startPoint.add($0).minus($1);
        },
        $24: function() {
            var $0 = [];
            if (!!this._showMode) {
                $0.add(this._startPoint);
                $0.add(this.$23(0, this._startWidth, this._showMode));
            } else {
                $0.add(this.$23(0, this._startWidth, 1));
            }
            for (var $2 = 0; $2 < this._needlePoints.length; $2++) {
                if (!!this._showMode) {
                    $0.add(this.$23(this._needlePoints[$2].portion, this._needlePoints[$2].width, this._showMode));
                } else {
                    $0.add(this.$23(this._needlePoints[$2].portion, this._needlePoints[$2].width, 1));
                }
            }
            if (!this._showMode) {
                $0.add(this.$23(1, this._endWidth, 1));
                $0.add(this.$23(1, this._endWidth, 2));
                for (var $3 = this._needlePoints.length - 1; $3 >= 0; $3--) {
                    $0.add(this.$23(this._needlePoints[$3].portion, this._needlePoints[$3].width, 2));
                }
                $0.add(this.$23(0, this._startWidth, 2));
            } else {
                $0.add(this.$23(1, this._endWidth, this._showMode));
                $0.add(this._endPoint);
            }
            var $1 = new Array($0.length);
            for (var $4 = 0; $4 < $0.length; $4++) {
                $1[$4] = $0[$4];
            }
            return $1;
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                this.setSuffix('needle_');
                painter.createGroup();
                painter.clearGroup();
                if (this._startPoint.minus(this._endPoint).abs() > 0.1) {
                    if (fill != null && this.isJointChild()) {
                        var $0 = PerfectWidgets.Framework.DataObjects.Vector.toDegrees(this.getEndPoint().minus(this.getStartPoint()).getRotation());
                        fill.setAdditionalAngle($0);
                    }
                    painter.drawPolygon(fill, stroke, this.$24());
                } else {
                    painter.clearGroup();
                }
                painter.endGroup();
            }
        },
        getHitTest: function(point) {
            var $0 = this.getRealPosition(point);
            if (this.getBoundedBox().contains($0)) {
                return PerfectWidgets.Framework.Geometry.GeometryUtilities.isIncludePoint(this.$24(), $0);
            }
            return false;
        },
        getBoundedBox: function() {
            return PerfectWidgets.Framework.Geometry.GeometryUtilities.getPolygonBox(this.$24());
        },
        getStartWidth: function() {
            return this._startWidth;
        },
        setStartWidth: function(value) {
            if (this._startWidth !== value) {
                this._startWidth = value;
                this.setNeedRepaint(true);
            }
        },
        getEndWidth: function() {
            return this._endWidth;
        },
        setEndWidth: function(value) {
            if (this._endWidth !== value) {
                this._endWidth = value;
                this.setNeedRepaint(true);
            }
        },
        getShowMode: function() {
            return this._showMode;
        },
        setShowMode: function(value) {
            if (this._showMode !== value) {
                this._showMode = value;
            }
        },
        getNeedlePoints: function() {
            return this._needlePoints;
        },
        setNeedlePoints: function(points) {
            this._needlePoints = points;
            this.setNeedRepaint(true);
        }
    }
    PerfectWidgets.Model.BaseElements.NeedlePoint = function() {}
    PerfectWidgets.Model.BaseElements.NeedlePoint.prototype = {
        portion: 0,
        width: 0,
        setPortion: function(portion) {
            this.portion = portion;
        },
        setWidth: function(width) {
            this.width = width;
        }
    }
    PerfectWidgets.Model.BaseElements.NeedlePointCollection = function() {
        this.$0 = [];
    }
    PerfectWidgets.Model.BaseElements.NeedlePointCollection.prototype = {
        add: function(value) {
            this.$0.add(value);
            return value;
        },
        addRange: function(values) {
            var $enum1 = ss.IEnumerator.getEnumerator(values);
            while ($enum1.moveNext()) {
                var $0 = $enum1.current;
                this.add($0);
            }
        },
        remove: function(value) {
            this.$0.remove(value);
        },
        insert: function(index, value) {
            this.$0.insert(index, value);
        },
        contains: function(value) {
            return this.$0.contains(value);
        },
        indexOf: function(value) {
            return this.$0.indexOf(value);
        },
        count: function() {
            return this.$0.length;
        },
        get_item: function(index) {
            return (Type.safeCast(this.$0[index], PerfectWidgets.Model.BaseElements.NeedlePoint));
        },
        set_item: function(index, value) {
            this.$0[index] = value;
            return value;
        }
    }
    PerfectWidgets.Model.BaseElements.Picture = function() {
        PerfectWidgets.Model.BaseElements.Picture.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Picture.prototype = {
        $23: null,
        getImage: function() {
            return this.$23;
        },
        setImage: function(value) {
            if (this.$23 !== value) {
                this.$23 = value;
                this.setNeedRepaint(true);
            }
        },
        resetImage: function() {
            this.$23 = null;
            this.setNeedRepaint(true);
        },
        drawContent: function(painter, fill, stroke) {
            if (this.$23 != null) {
                painter.drawImage(this.$23, this.getBounds());
            }
        }
    }
    PerfectWidgets.Model.BaseElements.PictureSet = function() {
        this.$23 = [];
        this.$24 = -1;
        PerfectWidgets.Model.BaseElements.PictureSet.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.PictureSet.prototype = {
        getImages: function() {
            return this.$23;
        },
        setImages: function(images) {
            this.$23 = images;
            this.setNeedRepaint(true);
        },
        getImageIndex: function() {
            return this.$24;
        },
        setImageIndex: function(index) {
            if (this.$24 !== index) {
                this.$24 = index;
                this.setNeedRepaint(true);
            }
        },
        drawContent: function(painter, fill, stroke) {
            if ((this.$24 >= 0) && (this.$24 < this.$23.length) && (this.$23[this.$24] != null)) {
                painter.drawImage(this.$23[this.$24], this.getBounds());
            }
        }
    }
    PerfectWidgets.Model.BaseElements.Pie = function() {
        PerfectWidgets.Model.BaseElements.Pie.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Pie.prototype = {
        drawContent: function(painter, fill, stroke) {
            var $0 = this.$26();
            painter.createGroup();
            painter.drawGraphicsPath(fill, stroke, $0);
            painter.endGroup();
        },
        $26: function() {
            var $0 = this.getBounds().getLocation();
            var $1 = this.getSize();
            var $2 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($0.x, $0.y, $1.x, $1.y).getPositiveRectangle();
            var $3 = this.getCenter();
            var $4 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $5 = new PerfectWidgets.Framework.DataObjects.Vector($2.width / 2, $2.height / 2);
            var $6 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint($2.getCenter(), $5, this.getStartAngle());
            var $7 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint($2.getCenter(), $5, this.getStartAngle() + this.getSweepAngle());
            $4.startPath($3);
            var $8 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $8.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector($6));
            $4.addPathElement($8);
            var $9 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            var $A = PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillParameters($2, this.getStartAngle(), this.getSweepAngle());
            $9.add($A);
            $4.addPathElement($9);
            $4.terminate();
            var $B = $2.getTopLeft();
            var $C = $2.getBottomRight();
            var $D = new PerfectWidgets.Framework.DataObjects.VectorRectangle($B.x, $B.y, $C.x, $C.y);
            $4.setBounds($D);
            return $4;
        },
        getHitTest: function(point) {
            if (!PerfectWidgets.Model.BaseElements.Pie.callBaseMethod(this, 'getHitTest', [point])) {
                return false;
            }
            var $0 = this.getRealPosition(point);
            var $1 = PerfectWidgets.Framework.Geometry.GeometryUtilities.isPieIncludePoint($0, this.getBounds(), this.getAngle(), this.getStartAngle(), this.getSweepAngle(), 0.01);
            return $1;
        }
    }
    PerfectWidgets.Model.BaseElements.Polygon = function() {
        PerfectWidgets.Model.BaseElements.Polygon.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Polygon.prototype = {
        _sides: 1,
        getVertex: function() {
            var $0 = 2 * Math.PI / this._sides;
            var $1 = new Array(this._sides);
            for (var $2 = 0; $2 < this._sides; $2++) {
                $1[$2] = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(this._radius, $0 * $2 - Math.PI / 2 + PerfectWidgets.Framework.DataObjects.Vector.toRadians(this._angle)).add(this._center);
            }
            return $1;
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                this.setSuffix('poly_');
                painter.createGroup();
                painter.clearGroup();
                painter.drawPolygon(fill, stroke, this.getVertex());
                painter.endGroup();
            }
        },
        getBoundedBox: function() {
            return PerfectWidgets.Framework.Geometry.GeometryUtilities.getPolygonBox(this.getVertex());
        },
        getHitTest: function(point) {
            var $0 = this.getRealPosition(point);
            return PerfectWidgets.Framework.Geometry.GeometryUtilities.isIncludePoint(this.getVertex(), $0);
        },
        getSides: function() {
            return this._sides;
        },
        setSides: function(value) {
            if (value <= 0) {
                throw new Error('PerpetuumSoft.Framework.ExceptionBuilder.ArgumentNegativeOrZero("value");');
            }
            if (this._sides !== value) {
                this._sides = value;
                this.setNeedRepaint(true);
            }
        }
    }
    PerfectWidgets.Model.BaseElements.PropertyEventArgs = function() {
        PerfectWidgets.Model.BaseElements.PropertyEventArgs.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Rectangle = function() {
        PerfectWidgets.Model.BaseElements.Rectangle.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Rectangle.prototype = {
        drawContent: function(painter, fill, stroke) {
            painter.setContext(this);
            this.setSuffix('rectangle1');
            painter.drawRectangle(fill, stroke, this.getBounds(), 0);
        }
    }
    PerfectWidgets.Model.BaseElements.RectangleElement = function() {
        PerfectWidgets.Model.BaseElements.RectangleElement.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.RectangleElement.prototype = {
        _angle: 0,
        getHitTest: function(point) {
            var $0 = this.getRealPosition(point);
            return this.getBounds().contains($0);
        },
        getBoundedBox: function() {
            if ((this._angle != null & this._center != null) === 1) {
                var $8 = new PerfectWidgets.Framework.Transformation.RotateTransformation();
                $8.setCenter(this._center);
                $8.setAngle(this._angle);
                this.setTransformation($8);
            }
            var $0 = this.getRealPosition(this.getBounds().getTopLeft());
            var $1 = this.getRealPosition(this.getBounds().getTopRight());
            var $2 = this.getRealPosition(this.getBounds().getBottomLeft());
            var $3 = this.getRealPosition(this.getBounds().getBottomRight());
            var $4 = Math.min(Math.min($0.x, $1.x), Math.min($2.x, $3.x));
            var $5 = Math.min(Math.min($0.y, $1.y), Math.min($2.y, $3.y));
            var $6 = Math.max(Math.max($0.x, $1.x), Math.max($2.x, $3.x));
            var $7 = Math.max(Math.max($0.y, $1.y), Math.max($2.y, $3.y));
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle($4, $5, $6 - $4, $7 - $5);
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                if ((this._angle != null & this._center != null) === 1) {
                    var $0 = new PerfectWidgets.Framework.Transformation.RotateTransformation();
                    $0.setCenter(this._center);
                    $0.setAngle(this._angle);
                    this.setTransformation($0);
                }
                if ((!!this.getBounds().width) && (!!this.getBounds().height)) {
                    if ((this._size.x > 0.001) && (this._size.y > 0.001)) {
                        this.setSuffix('rect');
                        painter.createGroup();
                        painter.clearGroup();
                        this.drawContent(painter, fill, stroke);
                        painter.endGroup();
                    }
                }
                this.setNeedRepaint(false);
            }
        },
        drawContent: function(painter, fill, stroke) {},
        getAngle: function() {
            return this._angle;
        },
        setAngle: function(value) {
            var $0 = Math.round((value % 360));
            if (this._angle !== $0) {
                this._angle = $0;
                this.setNeedRepaint(true);
            }
        },
        onBoundsChanged: function() {
            PerfectWidgets.Model.BaseElements.RectangleElement.callBaseMethod(this, 'onBoundsChanged');
        }
    }
    PerfectWidgets.Model.BaseElements.RingSector = function() {
        PerfectWidgets.Model.BaseElements.RingSector.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.RingSector.prototype = {
        $26: 0,
        getInternalRadius: function() {
            return this.$26;
        },
        setInternalRadius: function(internalRadiusValue) {
            internalRadiusValue = (internalRadiusValue > 1) ? 1 : ((internalRadiusValue < 0) ? 0 : internalRadiusValue);
            if (this.$26 !== internalRadiusValue) {
                this.$26 = internalRadiusValue;
            }
        },
        drawContent: function(painter, fill, stroke) {
            var $0 = this.$27();
            painter.createGroup();
            fill = this.getFill();
            painter.drawGraphicsPath(fill, stroke, $0);
            painter.endGroup();
        },
        $27: function() {
            var $0 = this.getStartAngle();
            var $1 = this.getSweepAngle();
            if ($1 < 0) {
                $0 = this.getStartAngle() + this.getSweepAngle();
                $1 = this.getStartAngle() - $0;
            }
            var $2 = PerfectWidgets.Framework.DataObjects.Vector.toRadians($0);
            var $3 = PerfectWidgets.Framework.DataObjects.Vector.toRadians($0 + $1);
            var $4 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipseRadius(this.getBounds(), $2);
            var $5 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipseRadius(this.getBounds(), $3);
            var $6 = this.getBounds().getCenter();
            var $7 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar($4, $2);
            var $8 = new PerfectWidgets.Framework.DataObjects.Vector($7.x + $6.x, $7.y + $6.y);
            var $9 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar($5, $3);
            var $A = new PerfectWidgets.Framework.DataObjects.Vector($9.x + $6.x, $9.y + $6.y);
            var $B = PerfectWidgets.Framework.DataObjects.Vector.fromPolar($4 * this.getInternalRadius(), $2);
            var $C = new PerfectWidgets.Framework.DataObjects.Vector($6.x + $B.x, $6.y + $B.y);
            var $D = PerfectWidgets.Framework.DataObjects.Vector.fromPolar($5 * this.getInternalRadius(), $3);
            var $E = new PerfectWidgets.Framework.DataObjects.Vector($6.x + $D.x, $6.y + $D.y);
            var $F = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            $F.startPath($8);
            $F.setBounds(this.getBoundedBox());
            var $10 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            var $11 = new PerfectWidgets.Framework.Drawing.EllipticArcParameters();
            $11.setFinishPoint(PerfectWidgets.Framework.Drawing.Unit.vectorToPixel($A));
            $11.setLargeArcFlag(($1 % 360 > 180) ? 1 : 0);
            $11.setSweepFlag(($1 > 0) ? 1 : 0);
            $11.setRx(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(this.getBounds().width / 2));
            $11.setRy(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(this.getBounds().height / 2));
            $10.add($11);
            $F.addPathElement($10);
            $F.addLine($E);
            var $12 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            var $13 = new PerfectWidgets.Framework.Drawing.EllipticArcParameters();
            $13.setFinishPoint(PerfectWidgets.Framework.Drawing.Unit.vectorToPixel($C));
            $13.setLargeArcFlag(($1 % 360 > 180) ? 1 : 0);
            $13.setSweepFlag(($1 > 0) ? 0 : 1);
            $13.setRx(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(this.getSize().x * this.getInternalRadius() / 2));
            $13.setRy(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(this.getSize().y * this.getInternalRadius() / 2));
            $12.add($13);
            $F.addPathElement($12);
            $F.terminate();
            return $F;
        },
        getHitTest: function(point) {
            if (!PerfectWidgets.Model.BaseElements.RingSector.callBaseMethod(this, 'getHitTest', [point])) {
                return false;
            }
            var $0 = this.getRealPosition(point);
            var $1 = this._size.x / 2;
            var $2 = this._size.y / 2;
            var $3 = PerfectWidgets.Framework.Geometry.GeometryUtilities.rotateVector($0, this.getBounds().getCenter(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(-this._angle)).minus(this.getBounds().getCenter());
            var $4 = PerfectWidgets.Framework.Geometry.GeometryUtilities.isPieIncludePoint($0, this.getBounds(), this.getAngle(), this.getStartAngle(), this.getSweepAngle(), 0.01);
            if ($4) {
                var $5 = $3.x * $3.x / $1 / $1 + $3.y * $3.y / $2 / $2;
                return ($5 <= 1) && ($5 >= this.$26 / 2);
            }
            return false;
        }
    }
    PerfectWidgets.Model.BaseElements.RoundedRectangle = function() {
        PerfectWidgets.Model.BaseElements.RoundedRectangle.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.RoundedRectangle.prototype = {
        $23: 0,
        getRadius: function() {
            return this.$23;
        },
        setRadius: function(radiusValue) {
            if (radiusValue > 0 && this.$23 !== radiusValue) {
                this.$23 = radiusValue;
            }
        },
        drawContent: function(painter, fill, stroke) {
            painter.setContext(this);
            var $0 = this.getRadius();
            var $1 = this.getBounds().getPositiveRectangle();
            if ($1.width < 2 * $0) {
                $0 = $1.width / 2;
            }
            if ($1.height < 2 * $0) {
                $0 = $1.height / 2;
            }
            painter.drawRoundedRectangle(fill, stroke, $1, $0, $0);
        }
    }
    PerfectWidgets.Model.BaseElements.RoundedVectorRectangle = function() {
        PerfectWidgets.Model.BaseElements.RoundedVectorRectangle.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.RoundedVectorRectangle.prototype = {
        $23: 0,
        $24: 0,
        getRadiusX: function() {
            return this.$23;
        },
        setRadiusX: function(rx) {
            this.$23 = rx;
        },
        getRadiusY: function() {
            return this.$24;
        },
        setRadiusY: function(ry) {
            this.$24 = ry;
        },
        drawContent: function(painter, fill, stroke) {
            throw new Error('Not implemented RoundedRectangle.DrawContent');
        },
        getBoundedBox: function() {
            throw new Error('Not implemented RoundedRectangle.GetBOundedBox');
        },
        getHitTest: function(point) {
            throw new Error('Not implemented RoundedRectangle.GetHitTest');
        }
    }
    PerfectWidgets.Model.BaseElements.Scale = function() {
        PerfectWidgets.Model.BaseElements.Scale.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Scale.$2A = function($p0, $p1) {
        for (var $0 = 0; $0 < $p1.count(); $0++) {
            var $1 = $p1.get_item($0);
            var $2 = Type.safeCast($1, PerfectWidgets.Model.BaseElements.IScaleElement);
            if (($2 != null) && $2.getVisible() && (!!$2.getDock())) {
                $p0.add($2);
            }
            var $3 = Type.safeCast($1, PerfectWidgets.Model.BaseElements.Composite);
            if (($3 != null) && (!!$3.getElements().count())) {
                PerfectWidgets.Model.BaseElements.Scale.$2A($p0, $3.getElements());
            }
        }
    }
    PerfectWidgets.Model.BaseElements.Scale.$2B = function($p0, $p1) {
        var $0 = [];
        PerfectWidgets.Model.BaseElements.Scale.$2A($0, (Type.safeCast($p0, PerfectWidgets.Model.BaseElements.Composite)).getElements());
        var $1 = 0;
        var $enum1 = ss.IEnumerator.getEnumerator($0);
        while ($enum1.moveNext()) {
            var $4 = $enum1.current;
            if ($4.getDock() === 3) {
                var $5 = $4.getSize();
                $1 = Math.max($1, $5);
                $4.setStartDistance(-$5 / 2 + $p1);
            }
        }
        var $2 = $1 / 2;
        var $3 = $1 / 2;
        var $enum2 = ss.IEnumerator.getEnumerator($0);
        while ($enum2.moveNext()) {
            var $6 = $enum2.current;
            if ($6.getDock() === 2) {
                $6.setStartDistance($2 + $6.getPadding() + $p1);
                $2 += $6.getPadding() + $6.getSize();
            }
            if ($6.getDock() === 1) {
                var $7 = $6.getSize();
                $6.setStartDistance(-$3 - $6.getPadding() - $7 + $p1);
                $3 += $6.getPadding() + $7;
            }
        }
    }
    PerfectWidgets.Model.BaseElements.Scale.prototype = {
        $24: null,
        $25: 0,
        $26: 100,
        $27: false,
        getColorizer: function() {
            return this.$24;
        },
        setColorizer: function(value) {
            if (this.$24 !== value) {
                this.$24 = value;
            }
        },
        calculateTransformationInfo: function(value) {
            var $0 = this.getTrajectory();
            if ($0 != null) {
                return $0.portionToTransformation((value - this.getMinimum()) / (this.getMaximum() - this.getMinimum()));
            }
            return null;
        },
        getTrajectory: function() {
            return Type.safeCast(this.getParent(), PerfectWidgets.Model.BaseElements.ITrajectory);
        },
        getMinimum: function() {
            return this.$25;
        },
        setMinimum: function(value) {
            if (this.$25 !== value) {
                this.$25 = value;
                this.$2C();
            }
        },
        getMaximum: function() {
            return this.$26;
        },
        setMaximum: function(value) {
            if (this.$26 !== value) {
                this.$26 = value;
                this.$2C();
            }
        },
        getReverse: function() {
            return this.$27;
        },
        setReverse: function(value) {
            if (this.$27 !== value) {
                this.$27 = value;
                this.$2C();
            }
        },
        percentToValue: function(percent) {
            var $0 = (this.$27) ? this.$26 : this.$25;
            var $1 = (this.$27) ? this.$25 : this.$26;
            return $0 + percent * ($1 - $0);
        },
        valueToPercent: function(value) {
            var $0 = (this.$27) ? this.$26 : this.$25;
            var $1 = (this.$27) ? this.$25 : this.$26;
            return (value - $0) / ($1 - $0);
        },
        $28: function($p0) {
            var $0 = (this.$27) ? this.$26 : this.$25;
            var $1 = (this.$27) ? this.$25 : this.$26;
            var $2 = PerfectWidgets.Framework.Utilities.MathHelper.log($0, 10);
            var $3 = PerfectWidgets.Framework.Utilities.MathHelper.log($1, 10);
            var $4 = PerfectWidgets.Framework.Utilities.MathHelper.log($p0, 10);
            return ($4 - $2) / ($3 - $2);
        },
        $29: function($p0) {
            var $0 = (this.$27) ? this.$26 : this.$25;
            var $1 = (this.$27) ? this.$25 : this.$26;
            var $2 = PerfectWidgets.Framework.Utilities.MathHelper.log($0, 10);
            var $3 = PerfectWidgets.Framework.Utilities.MathHelper.log($1, 10);
            var $4 = $p0 * ($3 - $2) + $2;
            return Math.pow(10, $4);
        },
        valueToPoint: function(value, radius) {
            var $0 = this.getTrajectory();
            if ($0 != null) {
                return $0.percentToPoint(this.valueToPercent(value), radius);
            }
            return PerfectWidgets.Framework.DataObjects.Vector.empty;
        },
        pointToValue: function(point) {
            var $0 = this.getTrajectory();
            if ($0 != null) {
                return this.percentToValue($0.pointToPercent(point));
            }
            return Number.NaN;
        },
        fromRealValue: function(value) {
            return value;
        },
        toRealValue: function(value) {
            return value;
        },
        isDiscrete: function() {
            return false;
        },
        getDiscreteValuesCount: function() {
            return 0;
        },
        getDiscreteValue: function(index) {
            return null;
        },
        getObject: function(name) {
            if (name.toLowerCase() === 'maximum') {
                return this.$26;
            }
            if (name.toLowerCase() === 'minimum') {
                return this.$25;
            }
            return null;
        },
        calculate: function() {
            var $0 = 0;
            var $1 = this.getTrajectory();
            if ($1 != null) {
                $0 = $1.getStartDistance();
            }
            PerfectWidgets.Model.BaseElements.Scale.$2B(this, $0);
        },
        $2C: function() {
            var $0 = this.getElements();
            for (var $1 = 0; $1 < $0.count(); $1++) {
                var $2 = $0.get_item($1);
                var $3 = Type.safeCast($2, PerfectWidgets.Model.BaseElements.IScaleElement);
                if ($3 != null) {
                    $3.resetMeasure();
                }
            }
        }
    }
    PerfectWidgets.Model.BaseElements.ScaleElement = function() {
        this._minLimit = PerfectWidgets.Model.BaseElements.SmartValue.auto;
        this._maxLimit = PerfectWidgets.Model.BaseElements.SmartValue.auto;
        this._dock = 0;
        this._origin = PerfectWidgets.Model.BaseElements.SmartValue.auto;
        PerfectWidgets.Model.BaseElements.ScaleElement.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue = function(scale, origin, length) {
        if (scale != null) {
            if (length <= 0) {
                return 0;
            }
            if (!origin._kind) {
                return scale.getMinimum();
            }
            var $0 = 0;
            if (origin._kind === 2) {
                $0 = scale.percentToValue(origin._value / 100);
            } else {
                $0 = origin._value;
            }
            var $1 = Math.floor(($0 - scale.getMinimum()) / length);
            return $0 - $1 * length;
        }
        return 0;
    }
    PerfectWidgets.Model.BaseElements.ScaleElement.getRoundLabelsStep = function(maximum, minimum, divisions) {
        var $0 = (maximum - minimum) / divisions;
        var $1 = PerfectWidgets.Framework.Utilities.MathHelper.log($0, 10);
        var $2 = Math.ceil(-$1);
        var $3 = $0 * Math.pow(10, $2);
        if ($3 > 5 || $3 < 1) {
            $3 = 10;
        } else {
            if ($3 > 2) {
                $3 = 5;
            } else {
                if ($3 > 1) {
                    $3 = 2;
                } else {
                    $3 = 1;
                }
            }
        }
        return $3 * Math.pow(10, -$2);
    }
    PerfectWidgets.Model.BaseElements.ScaleElement.prototype = {
        _colorizer: null,
        _distance: 100,
        _padding: 0,
        getScale: function() {
            var $0 = this.getParent();
            while (($0 != null) && (!(Type.canCast($0, PerfectWidgets.Model.BaseElements.IScale)))) {
                $0 = $0.getParent();
            }
            return Type.safeCast($0, PerfectWidgets.Model.BaseElements.IScale);
        },
        getColorizer: function() {
            var $0 = this.getScale();
            if ((this._colorizer == null) && ($0 != null)) {
                return $0.getColorizer();
            }
            return this._colorizer;
        },
        setColorizer: function(value) {
            if (this._colorizer !== value) {
                this._colorizer = value;
                this.setNeedRepaint(true);
            }
        },
        shouldSerializeColorizer: function() {
            return (this._colorizer != null);
        },
        resetColorizer: function() {
            this.setColorizer(null);
        },
        getDistance: function() {
            return this._distance;
        },
        setDistance: function(value) {
            if (this._distance !== value) {
                this._distance = value;
            }
        },
        getMinLimit: function() {
            return this._minLimit;
        },
        setMinLimit: function(value) {
            value = PerfectWidgets.Model.BaseElements.SmartValue.parse(value);
            if (this._minLimit !== value) {
                this._minLimit = value;
                this.resetMeasure();
                this.setNeedRepaint(true);
            }
        },
        getMaxLimit: function() {
            return this._maxLimit;
        },
        setMaxLimit: function(value) {
            value = PerfectWidgets.Model.BaseElements.SmartValue.parse(value);
            if (this._maxLimit !== value) {
                this._maxLimit = value;
                this.resetMeasure();
                this.setNeedRepaint(true);
            }
        },
        getPadding: function() {
            return this._padding;
        },
        setPadding: function(value) {
            if (this._padding !== value) {
                this._padding = value;
                this.setNeedRepaint(true);
            }
        },
        getDock: function() {
            return this._dock;
        },
        setDock: function(value) {
            if (this._dock !== value) {
                this._dock = value;
                this.setNeedRepaint(true);
            }
        },
        getOrigin: function() {
            return this._origin;
        },
        setOrigin: function(value) {
            if (this._origin !== value) {
                this._origin = value;
                this.setNeedRepaint(true);
            }
        },
        getColor: function(value) {
            var $0 = this.getScale();
            if (($0 != null) && (this._colorizer != null)) {
                return this._colorizer.getColor($0.valueToPercent(value));
            }
            return PerfectWidgets.Framework.Drawing.Color.black;
        },
        isPaint: function(value) {
            var $0 = true;
            var $1 = this.getScale();
            if ($1 != null) {
                if (!!this._minLimit._kind) {
                    var $2 = this._minLimit._value;
                    if (this._minLimit._kind === 2) {
                        $2 = $1.percentToValue(this._minLimit._value / 100);
                    }
                    if ($2 > value) {
                        $0 = false;
                    }
                }
                if (!!this._maxLimit._kind && $0) {
                    var $3 = this._maxLimit._value;
                    if (this._maxLimit._kind === 2) {
                        $3 = $1.percentToValue(this._maxLimit._value / 100);
                    }
                    if ($3 < value) {
                        $0 = false;
                    }
                }
            } else {
                $0 = false;
            }
            return $0;
        },
        setStartDistance: function(distance) {
            this._distance = distance;
        },
        resetMeasure: function() {},
        onParentChanged: function() {
            this.resetMeasure();
        },
        onStyleChanged: function() {
            this.resetMeasure();
        },
        calculate: function() {
            this.resetMeasure();
        }
    }
    PerfectWidgets.Model.BaseElements.ScaleLabels = function() {
        this.$3B = PerfectWidgets.Model.BaseElements.SmartValue.auto;
        PerfectWidgets.Model.BaseElements.ScaleLabels.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ScaleLabels.prototype = {
        $3A: 10,
        getDivisions: function() {
            return this.$3A;
        },
        setDivisions: function(divisions) {
            if (divisions > 0 && this.$3A !== divisions) {
                this.$3A = divisions;
            }
        },
        getStep: function() {
            return this.$3B;
        },
        setStep: function(step) {
            if (this.$3B !== step) {
                if (!step._value && !!step._kind) {
                    throw new Error('ExceptionBuilder.ArgumentZero("Step");');
                }
                this.$3B = step;
            }
        },
        $3C: false,
        getUseRoundValues: function() {
            return this.$3C;
        },
        setUseRoundValues: function(useRoundValues) {
            if (this.$3C !== useRoundValues) {
                this.$3C = useRoundValues;
            }
        },
        getLabelsCount: function() {
            var $0 = 0;
            var $1 = this.getScale();
            if ($1 == null) {
                return this.$3A;
            }
            if ($1.isDiscrete()) {
                $0 = $1.getDiscreteValuesCount();
                if (!!$0) {
                    switch (this.$3B._kind) {
                        case 1:
                            $0 = Math.ceil($0 / Math.ceil(Math.abs(this.$3B._value)));
                            break;
                        case 2:
                            $0 = Math.ceil($0 / Math.ceil($0 * Math.abs(this.$3B._value) / 100));
                            break;
                    }
                }
            } else {
                var $2 = PerfectWidgets.Model.BaseElements.ScaleElement.getRoundLabelsStep($1.getMaximum(), $1.getMinimum(), this.$3A);
                var $3 = new PerfectWidgets.Model.BaseElements.SmartValue();
                $3.setKind(0);
                $3.setValue($2);
                var $4 = new PerfectWidgets.Model.BaseElements.SmartValue();
                $4.setKind(0);
                $4.setValue(0);
                var $5 = (this.getUseRoundValues()) ? $3 : this.getStep();
                var $6 = (this.getUseRoundValues()) ? $4 : this.getOrigin();
                switch ($5._kind) {
                    case 0:
                        var $7 = ($1.getMaximum() - $1.getMinimum()) / this.getDivisions();
                        if (PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue(this.getScale(), this._origin, $7) > $1.getMinimum()) {
                            $0 = this.getDivisions();
                        } else {
                            $0 = this.getDivisions() + 1;
                        }
                        break;
                    case 1:
                        $0 = Math.floor(($1.getMaximum() - PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue($1, $6, $5._value)) / Math.abs($5._value)) + 1;
                        break;
                    case 2:
                        var $8 = ($1.getMaximum() - $1.getMinimum()) / 100 * Math.abs($5._value);
                        $0 = Math.floor(($1.getMaximum() - PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue($1, $6, $8)) / $8) + 1;
                        break;
                }
            }
            return $0;
        },
        getValueByIndex: function(index) {
            var $0 = 0;
            var $1 = this.getScale();
            if ($1 != null) {
                if ($1.isDiscrete()) {
                    var $2 = this.getObjectByIndex(index);
                    $0 = $1.fromRealValue($2);
                } else {
                    var $3 = this.$3D();
                    var $4 = new PerfectWidgets.Model.BaseElements.SmartValue();
                    $4.setKind(0);
                    $4.setValue(0);
                    var $5 = (this.getUseRoundValues()) ? PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue($1, $4, $3) : PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue($1, this.getOrigin(), $3);
                    $0 = $3 * index + $5;
                }
            }
            return $0;
        },
        getObjectByIndex: function(index) {
            var $0 = null;
            var $1 = this.getScale();
            if ($1 != null && $1.isDiscrete()) {
                var $2 = new PerfectWidgets.Model.BaseElements.SmartValue();
                $2.setKind(1);
                $2.setValue(PerfectWidgets.Model.BaseElements.ScaleElement.getRoundLabelsStep($1.getMaximum(), $1.getMinimum(), this.getDivisions()));
                var $3 = (this.getUseRoundValues()) ? $2 : this.getStep();
                var $4 = 1;
                if ($1.isDiscrete()) {
                    switch ($3.getKind()) {
                        case 1:
                            $4 = Math.ceil(Math.abs($3.getValue()));
                            break;
                        case 2:
                            $4 = Math.ceil($1.getDiscreteValuesCount() * Math.abs($3.getValue()) / 100);
                            break;
                    }
                }
                $0 = $1.getDiscreteValue(index * $4);
            } else {
                $0 = this.getValueByIndex(index);
            }
            return PerfectWidgets.Framework.Utilities.MathHelper.round($0, 2);
        },
        $3D: function() {
            var $0 = 0;
            var $1 = this.getScale();
            if ($1 == null) {
                return 0;
            }
            if (this.getUseRoundValues()) {
                $0 = PerfectWidgets.Model.BaseElements.ScaleElement.getRoundLabelsStep($1.getMaximum(), $1.getMinimum(), this.getDivisions());
            } else {
                switch (this.getStep()._kind) {
                    case 0:
                        $0 = ($1.getMaximum() - $1.getMinimum()) / this.getDivisions();
                        break;
                    case 1:
                        $0 = Math.abs(this.getStep()._value);
                        break;
                    case 2:
                        $0 = ($1.getMaximum() - $1.getMinimum()) * Math.abs(this.getStep()._value) / 100;
                        break;
                }
            }
            return $0;
        },
        getBoundedBox: function() {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = this.getScale().valueToPoint(this.getScale().getMinimum(), 0);
                return new PerfectWidgets.Framework.DataObjects.VectorRectangle($1.x - this._distance, $1.y - this._distance, 2 * this._distance, 2 * this._distance);
            }
            return PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
        }
    }
    PerfectWidgets.Model.BaseElements.ScaleLabelsBase = function() {
        this.$24 = 1;
        this.$27 = PerfectWidgets.Framework.Drawing.Margins.empty;
        this.$28 = 1;
        this.$29 = 1;
        this.$2A = [];
        PerfectWidgets.Model.BaseElements.ScaleLabelsBase.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ScaleLabelsBase.$34 = function($p0, $p1) {
        var $0 = PerfectWidgets.Framework.DataObjects.Vector.toRadians($p1);
        var $1 = $p0.x * Math.abs(Math.cos($0)) + $p0.y * Math.abs(Math.sin($0));
        var $2 = $p0.y * Math.abs(Math.cos($0)) + $p0.x * Math.abs(Math.sin($0));
        return new PerfectWidgets.Framework.DataObjects.Vector($1, $2);
    }
    PerfectWidgets.Model.BaseElements.ScaleLabelsBase.$38 = function($p0, $p1) {
        var $0 = $p0.getCenter();
        var $1 = new Array(4);
        $1[0] = $p0.getTopLeft();
        $1[1] = $p0.getTopRight();
        $1[2] = $p0.getBottomRight();
        $1[3] = $p0.getBottomLeft();
        for (var $2 = 0; $2 < $1.length; $2++) {
            $1[$2] = $1[$2].add($1[$2].minus($0).rotate($p1));
        }
        return $1;
    }
    PerfectWidgets.Model.BaseElements.ScaleLabelsBase.prototype = {
        $23: null,
        $25: 0,
        $26: 0,
        $2B: true,
        getFont: function() {
            return this.$23;
        },
        setFont: function(value) {
            if (this.$23 !== value) {
                this.$23 = value;
                this.setNeedRepaint(true);
            }
        },
        resetFont: function() {
            this.setFont(null);
        },
        getTextRotationMode: function() {
            return this.$24;
        },
        setTextRotationMode: function(value) {
            if (this.$24 !== value) {
                this.$24 = value;
                this.setNeedRepaint(true);
            }
        },
        getTextAngle: function() {
            return this.$25;
        },
        setTextAngle: function(value) {
            if (this.$25 !== value) {
                this.$25 = value;
                this.setNeedRepaint(true);
            }
        },
        getOddLabelsDistance: function() {
            return this.$26;
        },
        setOddLabelsDistance: function(value) {
            if (this.$26 !== value) {
                if (value < 0) {
                    throw new Error('ArgumentNegative. OddLabelsDistance');
                }
                this.$26 = value;
                this.setNeedRepaint(true);
            }
        },
        getItemMargins: function() {
            return this.$27;
        },
        setItemMargins: function(value) {
            if (this.$27 !== value) {
                this.$27 = value;
                this.setNeedRepaint(true);
            }
        },
        getPosition: function() {
            return this.$28;
        },
        setPosition: function(value) {
            if (this.$28 !== value) {
                this.$28 = value;
                this.setNeedRepaint(true);
            }
        },
        getTextAlignment: function() {
            return this.$29;
        },
        setTextAlignment: function(value) {
            if (this.$29 !== value) {
                this.$29 = value;
                this.setNeedRepaint(true);
            }
        },
        getSize: function() {
            return this.$32();
        },
        $2C: function() {
            return this.$2A;
        },
        getShowSuperposableLabels: function() {
            return this.$2B;
        },
        setShowSuperposableLabels: function(value) {
            if (value !== this.$2B) {
                this.$2B = value;
                this.setNeedRepaint(true);
            }
        },
        paintLabel: function(painter, text, value, labelArea, textSize, centerTextPosition, fill, stroke) {
            painter.createGroup();
            if (painter != null) {
                var $0 = this.$33(value);
                var $1 = new PerfectWidgets.Framework.Drawing.SolidFill(this.getColor(value));
                this.setSuffix('.0' + value);
                painter.drawRectangle(fill, stroke, labelArea, $0);
                this.setSuffix('.1' + value);
                painter.drawText(text, this.getFont(), $1, centerTextPosition, $0, 1);
            }
            painter.endGroup();
        },
        $2D: function($p0, $p1, $p2, $p3, $p4) {
            var $0 = $p2.valueToPoint($p3, 0);
            var $1 = $p2.valueToPoint($p3, 5);
            var $2 = $1.minus($0);
            var $3 = $2.getPerpendicular();
            var $4 = $2.getRotation();
            var $5 = PerfectWidgets.Framework.DataObjects.Vector.toDegrees($2.getRotation());
            var $6 = this.$33($p3);
            var $7 = PerfectWidgets.Model.BaseElements.ScaleLabelsBase.$34($p0, $6 - $5);
            var $8 = new PerfectWidgets.Framework.DataObjects.Vector(0, $7.y);
            var $9 = $8.rotate($4);
            var $A = PerfectWidgets.Framework.DataObjects.Vector.empty;
            switch ($p4) {
                case 1:
                    $A = $p1;
                    break;
                case 0:
                    $A = $p1.minus($9.divideByNumber(2));
                    break;
                case 2:
                    $A = $p1.add($9.divideByNumber(2));
                    break;
            }
            return $A;
        },
        $2E: function($p0, $p1) {
            var $0 = PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
            try {
                var $1 = this.getScale();
                if ($1 != null) {
                    var $2 = this.$2A[$p1];
                    var $3 = this.$33($2.get_value());
                    var $4 = this.$31($1, $p1);
                    var $5 = 0;
                    switch (this.getPosition()) {
                        case 2:
                            $5 = ($p0 - $4) / 2;
                            break;
                        case 1:
                            $5 = 0;
                            break;
                        case 0:
                            $5 = (-$p0 + $4) / 2;
                            break;
                    }
                    var $6 = this.getDistance() + $5;
                    if (this.$2A.length > 1) {
                        if ($p1 % 2 === 1) {
                            $6 += this.getOddLabelsDistance() / 2;
                        } else {
                            $6 -= this.getOddLabelsDistance() / 2;
                        }
                    }
                    $0 = PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
                    var $7 = $1.valueToPoint($2.get_value(), $6);
                    $7 = this.$2D($2.get_textSize(), $7, $1, $2.get_value(), this.getTextAlignment());
                    $0.width = $2.get_textSize().x;
                    $0.height = $2.get_textSize().y;
                    $0 = PerfectWidgets.Framework.DataObjects.VectorRectangle.expand($0, this.getItemMargins());
                    $0.x = $7.x - $2.get_textSize().x / 2;
                    $0.y = $7.y - $2.get_textSize().y / 2;
                }
            } catch ($8) {
                throw new Error('Exception on getting item rectangle ' + $8.toString());
            }
            return $0;
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                try {
                    var $0 = this.getSize();
                    if (!this.$2A.length) {
                        this.resetMeasure();
                    }
                    var $1 = this.getLabelsCount();
                    var $2 = PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
                    var $3 = 0;
                    this.setSuffix('slbs');
                    painter.createGroup();
                    painter.clearGroup();
                    for (var $4 = 0; $4 < this.$2A.length; $4++) {
                        this.setSuffix('.l' + $4);
                        var $5 = this.$2A[$4];
                        var $6 = this.$2E($0, $4);
                        var $7 = PerfectWidgets.Framework.DataObjects.VectorRectangle.shrink($6, this.getItemMargins()).getCenter();
                        var $8 = this.$33($5.get_value());
                        if (this.getShowSuperposableLabels() || !$4 || !this.$37($2, $3, PerfectWidgets.Framework.DataObjects.VectorRectangle.shrink($6, this.getItemMargins()), $8)) {
                            $2 = PerfectWidgets.Framework.DataObjects.VectorRectangle.shrink($6, this.getItemMargins());
                            $3 = $8;
                            this.paintLabel(painter, $5.get_text(), $5.get_value(), $6, $5.get_textSize(), $7, fill, stroke);
                        }
                    }
                    painter.endGroup();
                } catch ($9) {
                    throw new Error('Exception on Scale label paint ' + $9.toString());
                }
            }
        },
        $2F: function($p0, $p1, $p2, $p3) {
            var $0 = this.$33($p0);
            var $1 = $p2.minus($p1);
            var $2 = $1.getRotation() - PerfectWidgets.Framework.DataObjects.Vector.toRadians($0);
            return Math.abs($p3.x * Math.cos($2)) + Math.abs($p3.y * Math.sin($2));
        },
        $30: function($p0, $p1, $p2) {
            var $0 = this.$33($p0);
            var $1 = $p1.valueToPoint($p0, 0);
            var $2 = $p1.valueToPoint($p0, 5);
            var $3 = $2.minus($1);
            var $4 = $3.getRotation() - PerfectWidgets.Framework.DataObjects.Vector.toRadians($0);
            return Math.abs($p2.y * Math.cos($4)) + Math.abs($p2.x * Math.sin($4));
        },
        $31: function($p0, $p1) {
            if ($p0 == null || $p1 < 0 || $p1 > this.$2A.length) {
                return 0;
            }
            var $0 = this.$2A[$p1];
            var $1 = this.getItemMargins().size().add($0.get_textSize());
            var $2 = $p0.valueToPoint($0.get_value(), 0);
            var $3 = $p0.valueToPoint($0.get_value(), 5);
            return this.$2F($0.get_value(), $2, $3, $1);
        },
        $32: function() {
            var $0 = 0;
            try {
                var $1 = this.getScale();
                if ($1 == null) {
                    return $0;
                }
                if (!this.$2A.length) {
                    this.resetMeasure();
                }
                for (var $2 = 0; $2 < this.$2A.length; $2++) {
                    var $3 = this.$31($1, $2);
                    $0 = Math.max($0, $3);
                }
                if (this.$2A.length > 1) {
                    $0 += this.getOddLabelsDistance();
                }
            } catch ($4) {
                throw new Error('Error size calculating ' + $4.toString());
            }
            return $0;
        },
        $33: function($p0) {
            var $0 = this.getTextAngle();
            var $1 = this.getScale();
            if ($1 != null && this.getTextRotationMode() === 1) {
                $0 += PerfectWidgets.Framework.DataObjects.Vector.toDegrees($1.valueToPoint($p0, this.getDistance() + 5).minus($1.valueToPoint($p0, this.getDistance())).getRotation());
            }
            return $0;
        },
        $35: function($p0, $p1, $p2) {
            var $0 = null;
            if (this.getFont() != null) {
                var $1 = this.getFont();
                var $2 = PerfectWidgets.Framework.Utilities.TextUtilities.measureText($p0, $1, $p2).add(new PerfectWidgets.Framework.DataObjects.Vector(9, 1));
                var $3 = PerfectWidgets.Framework.Drawing.Unit.convert($2.x, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
                var $4 = PerfectWidgets.Framework.Drawing.Unit.convert($2.y, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
                $0 = new PerfectWidgets.Model.BaseElements.LabelInfo($p0, $p1, new PerfectWidgets.Framework.DataObjects.Vector($3, $4));
            } else {
                $0 = new PerfectWidgets.Model.BaseElements.LabelInfo('', 0, PerfectWidgets.Framework.DataObjects.Vector.empty);
            }
            return $0;
        },
        $36: function($p0, $p1, $p2) {
            var $0 = $p2.minus($p0.getCenter()).rotate(-$p1);
            var $1 = 1.1;
            return ($0.x < $p0.width / 2 * $1) && ($0.y < $p0.height / 2 * $1) && ($0.x > -$p0.width / 2 * $1) && ($0.y > -$p0.height / 2 * $1);
        },
        $37: function($p0, $p1, $p2, $p3) {
            var $0 = [$p2.getBottomLeft(), $p2.getBottomRight(), $p2.getTopLeft(), $p2.getTopRight()];
            var $1 = PerfectWidgets.Framework.DataObjects.Vector.toRadians($p1);
            var $2 = PerfectWidgets.Framework.DataObjects.Vector.toRadians($p3);
            for (var $4 = 0; $4 < $0.length; $4++) {
                $0[$4] = $0[$4].minus($p2.getCenter()).rotate($2).add($p2.getCenter());
                if (this.$36($p0, $1, $0[$4])) {
                    return true;
                }
            }
            var $3 = [$p0.getBottomLeft(), $p0.getBottomRight(), $p0.getTopLeft(), $p0.getTopRight()];
            for (var $5 = 0; $5 < $3.length; $5++) {
                $3[$5] = $3[$5].minus($p0.getCenter()).rotate(-$1).add($p0.getCenter());
                if (this.$36($p2, $2, $3[$5])) {
                    return true;
                }
            }
            return false;
        },
        getTextLabel: function(obj) {
            return obj;
        },
        getHitTest: function(point) {
            return PerfectWidgets.Model.BaseElements.ScaleLabelsBase.callBaseMethod(this, 'getHitTest', [point]);
        },
        setStartDistance: function(distance) {
            if (PerfectWidgets.Model.BaseElements.ScaleLabelsBase.callBaseMethod(this, 'getDistance') !== distance) {
                PerfectWidgets.Model.BaseElements.ScaleLabelsBase.callBaseMethod(this, 'setStartDistance', [distance]);
                this.setDistance(distance + this.getSize() / 2);
                this.setNeedRepaint(true);
            }
        },
        resetMeasure: function() {
            this.$2A.clear();
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = this.getLabelsCount();
                var $2 = Math.min($1, PerfectWidgets.Model.BaseElements.ScaleLabelsBase.$39);
                var $3 = 1 * $1 / $2;
                var $4 = 0;
                var $5 = this.getFont();
                var $6 = null;
                if ($5 != null) {
                    $6 = PerfectWidgets.Framework.Utilities.TextUtilities.insertMockDiv($5);
                }
                for (var $7 = $4; $7 < $2; $7++) {
                    var $8 = this.getValueByIndex(Math.min($1, parseInt($3) * $7));
                    var $9 = this.getObjectByIndex(Math.min($1, parseInt($3) * $7));
                    if (this.isPaint($8)) {
                        this.$2A.add(this.$35(this.getTextLabel($9), $8, $6));
                    }
                }
                if ($6 != null) {
                    PerfectWidgets.Framework.Utilities.TextUtilities.deleteMockDiv($6);
                }
            }
        }
    }
    PerfectWidgets.Model.BaseElements.ScaleMarksBase = function() {
        this._subTicksPosition = 0;
        this._step = PerfectWidgets.Model.BaseElements.SmartValue.auto;
        PerfectWidgets.Model.BaseElements.ScaleMarksBase.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ScaleMarksBase.prototype = {
        _divisions: 10,
        _subDivisions: 4,
        _discreteValues: false,
        _roundValues: false,
        getDivisions: function() {
            return this._divisions;
        },
        setDivisions: function(value) {
            if (value > 0 && this._divisions !== value) {
                this._divisions = value;
                this.setNeedRepaint(true);
            }
        },
        getSubDivisions: function() {
            return this._subDivisions;
        },
        setSubDivisions: function(value) {
            if (value > 0 && this._subDivisions !== value) {
                this._subDivisions = value;
                this.setNeedRepaint(true);
            }
        },
        getSubTicksPosition: function() {
            return this._subTicksPosition;
        },
        setSubTicksPosition: function(value) {
            if (this._subTicksPosition !== value) {
                this._subTicksPosition = value;
                this.setNeedRepaint(true);
            }
        },
        isDiscreteValues: function() {
            return this._discreteValues;
        },
        usiDiscretreValue: function(discrete) {
            if (this._discreteValues !== discrete) {
                this._discreteValues = discrete;
            }
        },
        getStep: function() {
            return this._step;
        },
        setStep: function(value) {
            if (this._step !== value) {
                if (!value._value && !!value._kind) {
                    throw new Error('ExceptionBuilder.ArgumentZero("Step");');
                }
                this._step = value;
                this.setNeedRepaint(true);
            }
        },
        isRoundValues: function() {
            return this._roundValues;
        },
        useRoundValue: function(round) {
            if (this._roundValues !== round) {
                this._roundValues = round;
            }
        },
        getSubTicksInternalRadius: function() {
            switch (this._subTicksPosition) {
                case 0:
                    return this._distance;
                case 1:
                    return this._distance + this.getWidth() / 2 - this.getSubWidth() / 2;
                case 2:
                    return this._distance + this.getWidth() - this.getSubWidth();
            }
            return this._distance;
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            if (this.getNeedRepaint()) {
                this.setNeedRepaint(false);
                this.setSuffix('smb');
                var $0 = [];
                painter.createGroup();
                if (this._discreteValues) {
                    this.$23(painter, $0, fill, stroke, stroke != null);
                } else {
                    this.$25(painter, $0, fill, stroke, stroke != null);
                }
                this.mergeAndDrawPaths(painter, $0, fill, stroke);
                painter.endGroup();
            }
        },
        $23: function($p0, $p1, $p2, $p3, $p4) {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = $0.getDiscreteValuesCount();
                var $2 = 0;
                var $3 = 0;
                if ($1 > 0) {
                    $2 = $0.fromRealValue($0.getDiscreteValue(0));
                }
                for (var $4 = 0; $4 < $1; $4++) {
                    this.buildMark($p1, $2, this.getWidth(), this._distance, $p2, $p3, $p4);
                    if ($4 !== $1 - 1) {
                        $3 = $0.fromRealValue($0.getDiscreteValue($4 + 1));
                        this.buildSubMark($p1, $2, $3, $p2, $p3, $p4);
                        $2 = $3;
                    }
                }
            }
        },
        $24: function() {
            var $0 = 0;
            var $1 = this.getScale();
            if (this._roundValues) {
                $0 = PerfectWidgets.Model.BaseElements.ScaleElement.getRoundLabelsStep($1.getMaximum(), $1.getMinimum(), this._divisions);
            } else {
                switch (this._step._kind) {
                    case 0:
                        $0 = ($1.getMaximum() - $1.getMinimum()) / this._divisions;
                        break;
                    case 1:
                        $0 = Math.abs(this._step._value);
                        break;
                    case 2:
                        $0 = ($1.getMaximum() - $1.getMinimum()) * Math.abs(this._step._value) / 100;
                        break;
                }
            }
            return $0;
        },
        $25: function($p0, $p1, $p2, $p3, $p4) {
            try {
                $p0.setContext(this);
                var $0 = this.getScale();
                if ($0 != null) {
                    var $1 = this.$24();
                    var $2 = new PerfectWidgets.Model.BaseElements.SmartValue();
                    $2.setKind(0);
                    $2.setValue(0);
                    var $3 = (this.isRoundValues()) ? $2 : this.getOrigin();
                    var $4 = PerfectWidgets.Model.BaseElements.ScaleElement.getRoundLabelsStep($0.getMaximum(), $0.getMinimum(), this.getDivisions());
                    var $5 = new PerfectWidgets.Model.BaseElements.SmartValue();
                    $5.setKind(0);
                    $5.setValue($4);
                    var $6 = (this.isRoundValues()) ? $5 : this.getStep();
                    var $7 = PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue($0, $3, $1);
                    var $8 = 0;
                    switch ($6._kind) {
                        case 0:
                            $8 = this.getDivisions();
                            break;
                        case 1:
                            $8 = Math.floor(($0.getMaximum() - PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue($0, this.getOrigin(), $6._value)) / Math.abs($6._value)) + 1;
                            break;
                        case 2:
                            var $9 = ($0.getMaximum() - $0.getMinimum()) / 100 * Math.abs($6._value);
                            $8 = Math.floor(($0.getMaximum() - PerfectWidgets.Model.BaseElements.ScaleElement.getStartValue($0, this.getOrigin(), $9)) / (($0.getMaximum() - $0.getMinimum()) / 100 * Math.abs($6._value))) + 1;
                            break;
                    }
                    $8 = Math.min($8, PerfectWidgets.Model.BaseElements.ScaleMarksBase._maxLabelsCount);
                    var $A = -1;
                    for (var $B = $A; $B <= $8; $B++) {
                        var $C = $7 + $B * $1;
                        this.buildMark($p1, $C, this.getWidth(), this.getDistance(), $p2, $p3, $p4);
                        if ($B !== $8) {
                            this.buildSubMark($p1, $C, $C + $1, $p2, $p3, $p4);
                        }
                    }
                }
            } catch ($D) {
                throw new Error('Framework.Logging.Logger.WriteDebug("Exception on scale mark paint " + ee.ToString());');
            }
        },
        needPaint: function(value) {
            var $0 = this.isPaint(value);
            if ($0) {
                var $1 = this.getScale();
                if ($1 != null) {
                    $0 = (value >= $1.getMinimum() && value <= $1.getMaximum());
                }
            }
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.SimpleRectangleElement = function() {
        PerfectWidgets.Model.BaseElements.SimpleRectangleElement.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.SimpleRectangleElement.prototype = {
        _center: null,
        _size: null,
        getHitTest: function(point) {
            var $0 = this.getRealPosition(point);
            return this.getBounds().contains($0);
        },
        getBoundedBox: function() {
            return this.getBounds();
        },
        getCenter: function() {
            return this._center;
        },
        setCenter: function(value) {
            if (this._center !== value) {
                this._center = value;
                this.onBoundsChanged();
                this.setNeedRepaint(true);
            }
        },
        getSize: function() {
            return this._size;
        },
        setSize: function(value) {
            if (this._size !== value) {
                this._size = value;
                this.onBoundsChanged();
                this.setNeedRepaint(true);
            }
        },
        getBounds: function() {
            var $0 = this._center.minus(this._size.divideByNumber(2));
            return new PerfectWidgets.Framework.DataObjects.VectorRectangle($0.x, $0.y, this._size.x, this._size.y).getPositiveRectangle();
        },
        setBounds: function(value) {
            this._center = value.getLocation().add(new PerfectWidgets.Framework.DataObjects.Vector(value.width / 2, value.height / 2));
            this._size = new PerfectWidgets.Framework.DataObjects.Vector(value.width, value.height);
            this.setNeedRepaint(true);
        },
        onBoundsChanged: function() {}
    }
    PerfectWidgets.Model.BaseElements.Slider = function() {
        PerfectWidgets.Model.BaseElements.Slider.initializeBase(this);
        this.$3F();
    }
    PerfectWidgets.Model.BaseElements.Slider.prototype = {
        $3F: function() {
            var $0 = new PerfectWidgets.Model.Animation.ManualAnimation();
            $0.setDuration(3);
            $0.setEasingFunction('swing');
            $0.setPropertyName('AnimationValue');
            this.setAnimation($0);
        },
        getPosition: function(radius) {
            var $0 = this.getScale();
            if ($0 != null) {
                return $0.valueToPoint(this.getAnimationValue(), radius);
            }
            return PerfectWidgets.Framework.DataObjects.Vector.empty;
        },
        $40: function($p0) {
            if (this.getAnimationValue() <= $p0.getMaximum()) {
                return 0;
            }
            var $0 = $p0.getMaximum() - $p0.getMinimum();
            var $1 = Type.safeCast($p0.getTrajectory(), PerfectWidgets.Model.BaseElements.Joint);
            var $2 = 0;
            if ($1 != null) {
                var $3 = $1.getTotalAngle();
                var $4 = $0 / $3;
                $2 = 360 - $1.getTotalAngle();
                return $2 * $4;
            }
            return 0;
        },
        getTransformationInfo: function() {
            var $0 = Type.safeCast(this.getScale(), PerfectWidgets.Model.BaseElements.Scale);
            if ($0 != null) {
                var $1 = 0;
                if (this.getAnimationState() === 8) {
                    $1 = this.getAnimationValue() + this.$40($0);
                } else {
                    $1 = this.getAnimationValue();
                }
                return $0.calculateTransformationInfo($1);
            }
            return null;
        },
        onMouseDown: function(args) {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = this.roundValue($0.pointToValue(args.getManipulationOrigin()));
                this.setValue($1, false);
                this.setDragged(true);
                this.setPressed(true);
                this.refreshElement();
            }
            PerfectWidgets.Model.BaseElements.Slider.callBaseMethod(this, 'onMouseDown', [args]);
        },
        onMouseEnter: function(args) {
            this.setHot(true);
            this.refreshElement();
            document.body.style.cursor = 'pointer';
            PerfectWidgets.Model.BaseElements.Slider.callBaseMethod(this, 'onMouseEnter', [args]);
        },
        onMouseLeave: function(args) {
            this.setHot(false);
            this.refreshElement();
            if (!this.getDragged()) {
                document.body.style.cursor = 'auto';
            }
            PerfectWidgets.Model.BaseElements.Slider.callBaseMethod(this, 'onMouseLeave', [args]);
        },
        onMouseMove: function(args) {
            var $0 = this.getScale();
            if (this._dragged) {
                if ($0 != null) {
                    var $1 = PerfectWidgets.Framework.Utilities.MathHelper.round(this.roundValue(this.getScale().pointToValue(args.getManipulationOrigin())), 10);
                    this.setValue($1, false);
                    this.refreshElement();
                }
            }
            PerfectWidgets.Model.BaseElements.Slider.callBaseMethod(this, 'onMouseMove', [args]);
        },
        onMouseUp: function(args) {
            var $0 = this.getScale();
            if (this._dragged) {
                this.setDragged(false);
                this.setPressed(false);
                this.refreshElement();
            }
            PerfectWidgets.Model.BaseElements.Slider.callBaseMethod(this, 'onMouseUp', [args]);
        }
    }
    PerfectWidgets.Model.BaseElements.SliderBase = function() {
        this._minLimit = PerfectWidgets.Model.BaseElements.SmartValue.auto;
        this._maxLimit = PerfectWidgets.Model.BaseElements.SmartValue.auto;
        this._animationState = 4;
        PerfectWidgets.Model.BaseElements.SliderBase.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.SliderBase.prototype = {
        _value: 0,
        _step: 0,
        _hot: false,
        _pressed: false,
        _dragged: false,
        _animation: null,
        add_$24: function($p0) {
            this.$25 = ss.Delegate.combine(this.$25, $p0);
        },
        remove_$24: function($p0) {
            this.$25 = ss.Delegate.remove(this.$25, $p0);
        },
        $25: null,
        add_$26: function($p0) {
            this.$27 = ss.Delegate.combine(this.$27, $p0);
        },
        remove_$26: function($p0) {
            this.$27 = ss.Delegate.remove(this.$27, $p0);
        },
        $27: null,
        add_$28: function($p0) {
            this.$29 = ss.Delegate.combine(this.$29, $p0);
        },
        remove_$28: function($p0) {
            this.$29 = ss.Delegate.remove(this.$29, $p0);
        },
        $29: null,
        add_$2A: function($p0) {
            this.$2B = ss.Delegate.combine(this.$2B, $p0);
        },
        remove_$2A: function($p0) {
            this.$2B = ss.Delegate.remove(this.$2B, $p0);
        },
        $2B: null,
        getValue: function() {
            return this._value;
        },
        setValue: function(newValue, isAnimatable) {
            if (!!this.getStep()) {
                newValue = Math.round(newValue / this.getStep()) * this.getStep();
            }
            if (newValue === this._value) {
                this.setAnimationValue(newValue);
                return;
            }
            if (isNaN(newValue)) {
                return;
            }
            newValue = this.$37(newValue);
            if (this._value !== newValue) {
                var $0 = this._value;
                this._value = newValue;
                this.onValueChanged();
                if (this.$38() && !(isAnimatable != null && !isAnimatable)) {
                    if (this.getAnimationState() === 4) {
                        this.setAnimationValue($0);
                        this.animate(this.getAnimationValue(), newValue);
                    } else if (this.getAnimationState() === 8) {
                        this.getAnimation().disposeAnimation();
                        this.$2F();
                        this.animate(this.getAnimationValue(), newValue);
                    }
                } else {
                    this.setAnimationValue(newValue);
                    this.setNeedRepaint(true);
                    this.refreshElement();
                }
            }
        },
        $2D: 0,
        $2E: function($p0, $p1, $p2) {
            if ($p0 === $p2 || $p0 === $p1) {
                return $p0;
            }
            if ($p0 < $p1) {
                return $p2 + ($p0 - $p1) % ($p2 - $p1);
            }
            if ($p0 > $p2) {
                return ($p0 - $p1) % ($p2 - $p1) + $p1;
            }
            return $p0;
        },
        getAnimationValue: function() {
            var $0 = Type.safeCast(this.getScale(), PerfectWidgets.Model.BaseElements.Scale);
            if ($0 != null) {
                var $1 = $0.getMaximum();
                var $2 = $0.getMinimum();
                if (this.$3B()) {
                    return this.$2E(this.$2D, $2, $1);
                } else {
                    return this.$37(this.$2D);
                }
            }
            return this.$2D;
        },
        $2F: function() {
            if (!this.$3B()) {
                return;
            }
            var $0 = Type.safeCast(this.getScale(), PerfectWidgets.Model.BaseElements.Scale);
            if ($0 != null) {
                var $1 = $0.getMaximum();
                var $2 = $0.getMinimum();
                var $3 = $1 - $2;
                this.setAnimationValue((this.getAnimationValue() - $2) % $3 + $2);
            }
        },
        setAnimationValue: function(animationValue) {
            if (this.$2D !== animationValue) {
                this.$2D = animationValue;
            }
        },
        $30: 0,
        $31: function($p0) {
            this.$30 = this._value;
        },
        animate: function(startValue, endValue) {
            if (this.getAnimationState() !== 8) {
                var $0 = this.getAnimation();
                var $1 = this.$34(new PerfectWidgets.Framework.DataObjects.Segment(startValue, endValue));
                if (Math.abs($1.get_startValue() - $1.get_endValue()) <= 2 * 1E-05) {
                    this.$2D = endValue;
                    this.setNeedRepaint(true);
                    this.refreshElement();
                    return;
                }
                $0.setStartValue($1.get_startValue());
                $0.setEndValue($1.get_endValue());
                var $2 = this.getScale();
                $0.setValueRange($2.getMaximum() - $2.getMinimum());
                $0.animate();
            }
        },
        $32: 0,
        getAnimationDirection: function() {
            return this.$32;
        },
        setNeedRepaint: function(need) {},
        $33: function($p0) {
            this.$32 = $p0;
        },
        $34: function($p0) {
            var $0 = null;
            var $1 = Type.safeCast(this.getScale(), PerfectWidgets.Model.BaseElements.Scale);
            if ($1 != null) {
                var $2 = $1.getMaximum();
                var $3 = $1.getMinimum();
                var $4 = $2 - $3;
                var $5 = this.getAnimationDirection();
                switch ($5) {
                    case PerfectWidgets.Framework.DataObjects.RotationDirection.noCycles:
                        $0 = $p0;
                        break;
                    case PerfectWidgets.Framework.DataObjects.RotationDirection.clockwise:
                        if ($p0.get_endValue() > $p0.get_startValue()) {
                            $0 = $p0;
                        } else {
                            $0 = this.$36($p0, $4);
                        }
                        break;
                    case PerfectWidgets.Framework.DataObjects.RotationDirection.anticlockwise:
                        if ($p0.get_endValue() < $p0.get_startValue()) {
                            $0 = $p0;
                        } else {
                            $0 = this.$35($p0, $4);
                        }
                        break;
                    case PerfectWidgets.Framework.DataObjects.RotationDirection.nearestWay:
                        if (Math.abs($p0.get_endValue() - $p0.get_startValue()) > $4 / 2) {
                            if ($p0.get_endValue() > $p0.get_startValue()) {
                                $0 = this.$35($p0, $4);
                            } else {
                                $0 = this.$36($p0, $4);
                            }
                        } else {
                            $0 = $p0;
                        }
                        break;
                }
            }
            return $0;
        },
        $35: function($p0, $p1) {
            return new PerfectWidgets.Framework.DataObjects.Segment($p0.get_startValue() + $p1 + 1E-05, $p0.get_endValue());
        },
        $36: function($p0, $p1) {
            return new PerfectWidgets.Framework.DataObjects.Segment($p0.get_startValue(), $p0.get_endValue() + $p1 + 1E-05);
        },
        addValueChangedHandler: function(handler) {
            this.add_$24(handler);
        },
        removeValueChangedHandler: function(handler) {
            this.remove_$24(handler);
        },
        addAnimationValueChangedHandler: function(handler) {
            this.add_$26(handler);
            this.add_$24(handler);
        },
        removeAnimationValueChangedHandler: function(handler) {
            this.remove_$26(handler);
            this.remove_$24(handler);
        },
        addAnimationStartingHandler: function(handler) {
            this.add_$28(handler);
        },
        removeAnimationStartingHandler: function(handler) {
            this.remove_$28(handler);
        },
        addAnimationFinishedHandler: function(handler) {
            this.add_$2A(handler);
        },
        removeAnimationFinishedHandler: function(handler) {
            this.remove_$2A(handler);
        },
        onValueChanged: function() {
            var $0 = this.getInstrument();
            if ($0 != null) {
                $0.setEnable(false);
            }
            if (this.$25 != null) {
                this.$25(this, ss.EventArgs.Empty);
            }
            if ($0 != null) {
                $0.setEnable(true);
            }
        },
        getStep: function() {
            return this._step;
        },
        setStep: function(value) {
            if (this._step !== value) {
                this._step = Math.abs(value);
                this.setNeedRepaint(true);
            }
        },
        getScale: function() {
            var $0 = this;
            while (($0 != null) && !(Type.canCast($0, PerfectWidgets.Model.BaseElements.IScale))) {
                $0 = $0.getParent();
            }
            return Type.safeCast($0, PerfectWidgets.Model.BaseElements.IScale);
        },
        getMinLimit: function() {
            return this._minLimit;
        },
        setMinLimit: function(value) {
            value = PerfectWidgets.Model.BaseElements.SmartValue.parse(value);
            if (!PerfectWidgets.Model.BaseElements.SmartValue.equals(this._minLimit, value)) {
                this._minLimit = value;
                this._value = this.$37(this._value);
                this.setNeedRepaint(true);
            }
        },
        getMaxLimit: function() {
            return this._maxLimit;
        },
        setMaxLimit: function(value) {
            value = PerfectWidgets.Model.BaseElements.SmartValue.parse(value);
            if (!PerfectWidgets.Model.BaseElements.SmartValue.equals(this._maxLimit, value)) {
                this._maxLimit = value;
                this._value = this.$37(this._value);
                this.setNeedRepaint(true);
            }
        },
        $37: function($p0) {
            var $0 = $p0;
            var $1 = this.getScale();
            var $2, $3;
            if ($1 != null) {
                $2 = $1.getMaximum();
                if (this._maxLimit._kind === 1) {
                    $2 = this._maxLimit._value;
                } else if (this._maxLimit._kind === 2) {
                    $2 = $1.percentToValue(this._maxLimit._value / 100);
                }
                $3 = $1.getMinimum();
                if (this._minLimit._kind === 1) {
                    $3 = this._minLimit._value;
                } else if (this._minLimit._kind === 2) {
                    $3 = $1.percentToValue(this._minLimit._value / 100);
                }
                $0 = Math.max(Math.min($p0, $2), $3);
            }
            return $0;
        },
        getHot: function() {
            return this._hot;
        },
        getPressed: function() {
            return this._pressed;
        },
        getDragged: function() {
            return this._dragged;
        },
        setDragged: function(value) {
            if (value !== this._dragged) {
                this._dragged = value;
                this.setNeedRepaint(true);
            }
        },
        setPressed: function(value) {
            if (value !== this._pressed) {
                this._pressed = value;
                this.refreshElement();
            }
        },
        setHot: function(value) {
            if (value !== this._hot) {
                this._hot = value;
                this.refreshElement();
            }
        },
        roundValue: function(value) {
            if (!!this._step) {
                var $0 = this.$37(Number.MIN_VALUE);
                return Math.round((value - $0) / this._step) * this._step + $0;
            }
            return value;
        },
        getObject: function(name) {
            if (name.toLowerCase() === 'hot') {
                return this._hot;
            }
            if (name.toLowerCase() === 'pressed') {
                return this._pressed;
            }
            if (name.toLowerCase() === 'center') {
                return this.getPosition(0);
            }
            if (name.toLowerCase() === 'value') {
                return this._value;
            }
            return null;
        },
        getRadius: function(point) {
            if (this.getScale() != null) {
                var $0 = this.getPosition(0);
                var $1 = this.getPosition(1);
                var $2 = point.getProjection($0, $1);
                var $3 = $0.minus($2).getLength();
                var $4 = $1.minus($2).getLength();
                return $3 * PerfectWidgets.Framework.Utilities.MathHelper.sign($3 - $4);
            }
            return 0;
        },
        bindingEnabled: function(enabled) {
            var $0 = this.getElements();
            for (var $1 = 0; $1 < $0.count(); $1++) {
                $0.get_item($1).bindingEnabled(enabled);
            }
        },
        $38: function() {
            var $0 = 4 | 8;
            return !!(this.getAnimationState() & $0);
        },
        getAnimation: function() {
            return this._animation;
        },
        setAnimation: function(animation) {
            if (animation != null) {
                animation.setContext(this);
            }
            this._animation = animation;
        },
        getAnimationState: function() {
            if (!this.getReady()) {
                return 1;
            }
            return this._animationState;
        },
        setAnimationState: function(state) {
            this._animationState = state;
        },
        $39: function($p0) {
            if ($p0) {
                this.setAnimationState(4);
            } else {
                this.setAnimationState(1);
            }
        },
        configureAnimation: function(configurationObject) {
            var $0 = Type.getInstanceType(configurationObject);
            var $1 = Type.safeCast(Type.getInstanceType(configurationObject).getOwnPropertyNames(configurationObject), Array);
            for (var $2 = 0; $2 < $1.length; $2++) {
                switch ($1[$2]) {
                    case 'enabled':
                        var $3 = configurationObject[$1[$2]];
                        this.$39($3);
                        break;
                    case 'direction':
                        var $4 = configurationObject[$1[$2]].toString();
                        this.$32 = this.$3C($4);
                        break;
                    default:
                        var $5 = configurationObject[$1[$2]];
                        this.getAnimation()[this.$3A($1[$2])]($5);
                        break;
                }
            }
        },
        $3A: function($p0) {
            switch ($p0) {
                case 'duration':
                    return 'setDuration';
                case 'ease':
                    return 'setEasingFunction';
            }
            throw new Error('Animation configuration exception: Invalid property name');
        },
        $3B: function() {
            return this.$32 !== PerfectWidgets.Framework.DataObjects.RotationDirection.noCycles;
        },
        $3C: function($p0) {
            switch ($p0) {
                case 'normal':
                    return PerfectWidgets.Framework.DataObjects.RotationDirection.noCycles;
                case 'CW':
                case 'clockwise':
                    return PerfectWidgets.Framework.DataObjects.RotationDirection.clockwise;
                case 'ACW':
                case 'CCW':
                case 'anticlockwise':
                case 'counterclockwise':
                    return PerfectWidgets.Framework.DataObjects.RotationDirection.anticlockwise;
                case 'nearest':
                    return PerfectWidgets.Framework.DataObjects.RotationDirection.nearestWay;
                default:
                    throw new Error('Unknown rotation direction');
            }
        },
        onAnimationStarting: function() {
            if (this.$29 != null) {
                var $0 = new ss.CancelEventArgs();
                this.$29(this, $0);
                return !$0.cancel;
            }
            return true;
        },
        onAnimationFinished: function() {
            if (this.$2B != null) {
                this.$2B(this, ss.EventArgs.Empty);
            }
        },
        onAnimationValueChanged: function() {
            var $0 = this.getInstrument();
            if ($0 != null) {
                $0.setEnable(false);
            }
            if (this.$27 != null) {
                var $1 = this.getAnimationState();
                if ($1 === 4 || $1 === 1) {
                    this.$27(this, ss.EventArgs.Empty);
                } else {
                    this.$27(this, ss.EventArgs.Empty);
                }
            }
            if ($0 != null) {
                $0.setEnable(true);
            }
        }
    }
    PerfectWidgets.Model.BaseElements.SmartValue = function() {}
    PerfectWidgets.Model.BaseElements.SmartValue.equals = function(v1, v2) {
        if (!v1._kind) {
            return !v2._kind;
        } else {
            return (v1._value === v2._value) && (v1._kind === v2._kind);
        }
    }
    PerfectWidgets.Model.BaseElements.SmartValue.parse = function(obj) {
        var $0 = new PerfectWidgets.Model.BaseElements.SmartValue();
        if (Type.canCast(obj, PerfectWidgets.Model.BaseElements.SmartValue)) {
            $0 = obj;
        } else if (Type.canCast(obj, Number)) {
            $0.setValue(obj);
            $0.setKind(1);
        } else {
            $0 = obj;
        }
        return $0;
    }
    PerfectWidgets.Model.BaseElements.SmartValue.prototype = {
        _value: 0,
        _kind: 0,
        getKind: function() {
            return this._kind;
        },
        setKind: function(kind) {
            this._kind = kind;
        },
        getValue: function() {
            return this._value;
        },
        setValue: function(value) {
            this._value = value;
        }
    }
    PerfectWidgets.Model.BaseElements.Star = function() {
        PerfectWidgets.Model.BaseElements.Star.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Star.prototype = {
        $23: 0,
        getInternalRadius: function() {
            return this.$23;
        },
        setInternalRadius: function(internalRadius) {
            if (internalRadius < 0) {
                throw new Error('value is negative');
            }
            if (this.$23 !== internalRadius) {
                this.$23 = internalRadius;
            }
        },
        getVertex: function() {
            var $0 = this.getSides() * 2;
            var $1 = 2 * Math.PI / $0;
            var $2 = new Array($0);
            for (var $3 = 0; $3 < $0; $3++) {
                $2[$3] = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(((!($3 % 2)) ? this.getRadius() : this.getInternalRadius()), $1 * $3 - Math.PI / 2 + PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getAngle())).add(this.getCenter());
            }
            return $2;
        }
    }
    PerfectWidgets.Model.BaseElements.TextItem = function() {
        this.$0 = '';
        this.$1 = PerfectWidgets.Model.BaseElements.SmartValue.auto;
    }
    PerfectWidgets.Model.BaseElements.TextItem.prototype = {
        getText: function() {
            return this.$0 + '';
        },
        setText: function(text) {
            if (text == null) {
                this.$0 = '';
            } else {
                this.$0 = text;
            }
        },
        getValue: function() {
            return this.$1;
        },
        setValue: function(value) {
            this.$1 = value;
        },
        toString: function() {
            if ((this.$0 != null) && (!!this.$0.length)) {
                return String.format('{0} - {1}', this.getValue(), this.getText());
            }
            return 'TextItem';
        }
    }
    PerfectWidgets.Model.BaseElements.Ticks = function() {
        PerfectWidgets.Model.BaseElements.Ticks.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Ticks.prototype = {
        $26: 10,
        $27: 5,
        getLength: function() {
            return this.$26;
        },
        setLength: function(value) {
            if (this.$26 !== value) {
                this.$26 = value;
                this.setNeedRepaint(true);
            }
        },
        getSubLength: function() {
            return this.$27;
        },
        setSubLength: function(value) {
            if (this.$27 !== value) {
                this.$27 = value;
                this.setNeedRepaint(true);
            }
        },
        getWidth: function() {
            return this.$26;
        },
        getSubWidth: function() {
            return this.$27;
        },
        buildSubMark: function(targetPath, startValue, endValue, fill, stroke, useSimpleStroke) {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = endValue - startValue;
                var $2 = this.getSubTicksInternalRadius();
                for (var $3 = 1; $3 < this._subDivisions; $3++) {
                    var $4 = startValue + $1 / this._subDivisions * $3;
                    this.buildMark(targetPath, $4, this.$27, $2, fill, stroke, useSimpleStroke);
                }
            }
        },
        buildMark: function(targetPath, value, length, distance, fill, stroke, useSimpleStroke) {
            if (this.needPaint(value)) {
                if (stroke == null) {
                    stroke = new PerfectWidgets.Framework.Drawing.Stroke();
                    stroke.setStyle(PerfectWidgets.Framework.Drawing.LineStyle.solid);
                    stroke.setWidth(1);
                    stroke.setColor(PerfectWidgets.Framework.Drawing.Color.black);
                }
                var $0 = this.getScale();
                var $1 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
                $1.moveTo($0.valueToPoint(value, distance));
                $1.addLine($0.valueToPoint(value, distance + length));
                $1.terminate();
                targetPath.add(new PerfectWidgets.Model.Drawing.ValuePathPair(value, $1));
            }
        },
        $28: function($p0, $p1, $p2, $p3) {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            for (var $1 = 0; $1 < $p1.length; $1++) {
                $0.addGraphicsPath($p1[$1].get_path());
            }
            $0.setBounds(this.getBoundedBox());
            $p0.drawGraphicsPath($p2, $p3, $0);
        },
        $29: function($p0, $p1, $p2, $p3) {
            var $0 = this.getScale();
            if ($0 != null) {
                var $1 = this.getColorizer();
                var $2 = {};
                var $3 = [];
                for (var $4 = 0; $4 < $p1.length; $4++) {
                    var $5 = $1.getColor($0.valueToPercent($p1[$4].get_value()));
                    if (!Object.keyExists($2, $5)) {
                        var $6 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
                        $2[$5] = $6;
                        $3.add($5);
                    }
                    $2[$5].addGraphicsPath($p1[$4].get_path());
                }
                for (var $7 = 0; $7 < Object.getKeyCount($2); $7++) {
                    var $8 = $3[$7];
                    this.setSuffix($7.toString());
                    var $9 = new PerfectWidgets.Framework.Drawing.Stroke();
                    $9.setColor($8);
                    $9.setStyle(PerfectWidgets.Framework.Drawing.LineStyle.solid);
                    $9.setWidth(($p3 == null) ? 1 : $p3.getWidth());
                    $p0.drawGraphicsPath($p2, $9, $2[$8]);
                }
            }
        },
        mergeAndDrawPaths: function(painter, paths, fill, stroke) {
            var $0 = stroke;
            if ($0 == null) {
                $0 = this.getStroke();
            }
            var $1 = this.getColorizer();
            if ($1 == null) {
                this.$28(painter, paths, fill, $0);
            } else {
                this.$29(painter, paths, fill, $0);
            }
        },
        getHitTest: function(point) {
            return PerfectWidgets.Model.BaseElements.Ticks.callBaseMethod(this, 'getHitTest', [point]);
        },
        getBoundedBox: function() {
            if ((this.getParent() == null) || !(Type.canCast(this.getParent(), PerfectWidgets.Model.BaseElements.IScale))) {
                return PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
            }
            var $0 = Type.safeCast(this.getParent(), PerfectWidgets.Model.BaseElements.IScale);
            var $1 = $0.valueToPoint($0.getMinimum(), this.getDistance() + this.$26);
            var $2 = $0.valueToPoint($0.getMaximum(), -this._distance - this.$26);
            var $3 = $2.minus($1);
            var $4 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($1.x, $1.y, $3.x, $3.y);
            return $4.getPositiveRectangle();
        },
        getSize: function() {
            return Math.max(this.$26, this.$27);
        }
    }
    PerfectWidgets.Model.BaseElements.TruncatedEllipse = function() {
        PerfectWidgets.Model.BaseElements.TruncatedEllipse.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.TruncatedEllipse.prototype = {
        drawContent: function(painter, fill, stroke) {
            painter.drawGraphicsPath(fill, stroke, this.$26());
        },
        $26: function() {
            var $0 = new PerfectWidgets.Framework.Drawing.GraphicsPath();
            var $1 = this.getBounds();
            var $2 = this.getSize();
            var $3 = $1.getTopLeft();
            var $4 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($3.x, $3.y, $2.x, $2.y).getPositiveRectangle();
            var $5 = PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getStartAngle());
            var $6 = PerfectWidgets.Framework.DataObjects.Vector.toRadians(this.getStartAngle() + this.getSweepAngle());
            var $7 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipseRadius($1, $5), $5).add($1.getCenter());
            var $8 = PerfectWidgets.Framework.DataObjects.Vector.fromPolar(PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipseRadius($1, $6), $6).add($1.getCenter());
            $0.startPath($7);
            var $9 = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.ellipticalArc);
            var $A = PerfectWidgets.Framework.Drawing.EllipticArcParameters.fillParameters($4, this.getStartAngle(), this.getSweepAngle());
            $9.add($A);
            $0.addPathElement($9);
            var $B = new PerfectWidgets.Framework.Drawing.PathElementCollection(PerfectWidgets.Framework.Drawing.GraphicsPathElementType.lineTo);
            $B.add(PerfectWidgets.Framework.Drawing.GraphicsPath.buildVector($8));
            $0.addPathElement($B);
            $0.terminate();
            $0.setBounds(this.getBoundedBox());
            return $0;
        },
        getHitTest: function(point) {
            if (!PerfectWidgets.Model.BaseElements.TruncatedEllipse.callBaseMethod(this, 'getHitTest', [point])) {
                return false;
            }
            var $0 = this.getRealPosition(point);
            var $1 = this._size.x / 2;
            var $2 = this._size.y / 2;
            var $3 = PerfectWidgets.Framework.Geometry.GeometryUtilities.rotateVector($0, this.getBounds().getCenter(), PerfectWidgets.Framework.DataObjects.Vector.toRadians(-this._angle)).minus(this.getBounds().getCenter());
            var $4 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint(this.getCenter(), new PerfectWidgets.Framework.DataObjects.Vector($1, $2), this.getStartAngle());
            var $5 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint(this.getCenter(), new PerfectWidgets.Framework.DataObjects.Vector($1, $2), this.getStartAngle() + this.getSweepAngle());
            var $6 = $5.minus($4);
            var $7 = $0.minus($4);
            $7 = PerfectWidgets.Framework.Geometry.GeometryUtilities.rotateVector($7, new PerfectWidgets.Framework.DataObjects.Vector(0, 0), -$6.getRotation());
            if (this.getSweepAngle() < 0) {
                $7.y = -$7.y;
            }
            var $8 = $3.x * $3.x / $1 / $1 + $3.y * $3.y / $2 / $2;
            return ($8 <= 1) && ($7.y < 0);
        }
    }
    PerfectWidgets.Model.BaseElements.ValuePresenterScaleElement = function() {
        this.$23 = PerfectWidgets.Model.BaseElements.SmartValue.auto;
        PerfectWidgets.Model.BaseElements.ValuePresenterScaleElement.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.ValuePresenterScaleElement.prototype = {
        getValue: function() {
            return this.$23;
        },
        setValue: function(val) {
            if (Type.getInstanceType(val).get_name() === 'SmartValue') {
                if (this.$23 !== val) {
                    this.$23 = val;
                    this.setNeedRepaint(true);
                }
            } else {
                if (this.$23.getValue() !== val) {
                    this.$23 = new PerfectWidgets.Model.BaseElements.SmartValue();
                    this.$23.setValue(val);
                    this.$23.setKind(1);
                    this.setNeedRepaint(true);
                }
            }
        },
        getSmartValue: function(value, autoValue) {
            return PerfectWidgets.Model.BaseElements._ElementPainter.$2(value, autoValue, this);
        },
        getMinValue: function() {
            return PerfectWidgets.Model.BaseElements._ElementPainter.$0(this);
        },
        getMaxValue: function() {
            return PerfectWidgets.Model.BaseElements._ElementPainter.$1(this);
        }
    }
    PerfectWidgets.Model.BaseElements.WidgetElement = function() {
        this.$3 = [];
        this.$7 = PerfectWidgets.Framework.Drawing.Fill.emptyFill;
        this.$C = PerfectWidgets.Framework.Utilities.Guid.newGuid();
        this.$D = '';
        this.$15 = {};
    }
    PerfectWidgets.Model.BaseElements.WidgetElement.getByType = function(instrument, type) {
        var $0 = [];
        var $1 = Type.safeCast(instrument, PerfectWidgets.Model.BaseElements.Composite);
        if (Type.canCast(instrument, PerfectWidgets.Model.BaseElements.Slider) && type === PerfectWidgets.Model.BaseElements.Slider) {
            $0.add(instrument);
        } else if ($1 == null) {
            if (Type.getInstanceType(instrument) === type) {
                $0.add(instrument);
            }
        } else {
            var $2 = $1.getElements();
            for (var $3 = 0; $3 < $2.count(); $3++) {
                var $enum1 = ss.IEnumerator.getEnumerator(PerfectWidgets.Model.BaseElements.WidgetElement.getByType($2.get_item($3), type));
                while ($enum1.moveNext()) {
                    var $4 = $enum1.current;
                    $0.add($4);
                }
            }
        }
        return $0;
    }
    PerfectWidgets.Model.BaseElements.WidgetElement.prototype = {
        $0: false,
        $1: null,
        $2: null,
        $4: false,
        $5: null,
        $6: null,
        $8: null,
        $9: true,
        $A: true,
        $B: true,
        $E: null,
        $16: null,
        add_recalculating: function(value) {
            this.$17 = ss.Delegate.combine(this.$17, value);
        },
        remove_recalculating: function(value) {
            this.$17 = ss.Delegate.remove(this.$17, value);
        },
        $17: null,
        $18: false,
        getReady: function() {
            return this.$18;
        },
        $19: function($p0) {
            if (this.$18 !== $p0) {
                this.$18 = $p0;
                if (true === $p0) {
                    this.$1A();
                }
            }
        },
        $1A: function() {
            var $0 = this.$5;
            while (true) {
                if ($0 == null) {
                    this.$1C = false;
                    break;
                } else if (Type.canCast($0, PerfectWidgets.Model.BaseElements.Joint)) {
                    this.$1C = true;
                    break;
                } else {
                    $0 = $0.getParent();
                }
            }
        },
        getBreakEventsBubbling: function() {
            return this.$0;
        },
        setBreakEventsBubbling: function(BreakEventsBubblingValue) {
            this.$0 = BreakEventsBubblingValue;
        },
        getName: function() {
            return this.$1;
        },
        setName: function(NameValue) {
            this.$1 = NameValue;
        },
        getClassName: function() {
            return this.$2;
        },
        setClassName: function(className) {
            this.$2 = className;
        },
        getSuffix: function() {
            return this.$D;
        },
        setSuffix: function(suffix) {
            this.$D = suffix;
        },
        getFullName: function() {
            if (this.$5 != null) {
                return this.$5.getFullName() + '_' + this.getName();
            }
            return this.getName();
        },
        getTransformation: function() {
            return this.$E;
        },
        setTransformation: function(transformation) {
            this.$E = transformation;
        },
        getGuid: function() {
            return this.$C;
        },
        getActive: function() {
            return this.$4;
        },
        setActive: function(ActiveValue) {
            this.$4 = ActiveValue;
        },
        getParent: function() {
            return this.$5;
        },
        $1B: false,
        $1C: false,
        isJointChild: function() {
            return this.$1C;
        },
        setParent: function(ParentValue) {
            if (this.$5 !== ParentValue) {
                this.$5 = ParentValue;
                if (this.$5 != null) {
                    if (Type.canCast(this.$5, PerfectWidgets.Model.BaseElements.ButtonBase) || Type.canCast(this.$5, PerfectWidgets.Model.BaseElements.SliderBase)) {
                        this.$1B = true;
                    } else {
                        this.$1B = false;
                    }
                }
            }
        },
        getInstrument: function() {
            if (this.$5 != null) {
                return this.$5.getInstrument();
            } else {
                return Type.safeCast(this, PerfectWidgets.Model.BaseElements.Instrument);
            }
        },
        getFill: function() {
            return this.$7;
        },
        setFill: function(FillValue) {
            this.$7 = FillValue;
            this.setNeedRepaint(true);
        },
        getStroke: function() {
            return this.$8;
        },
        setStroke: function(stroke) {
            this.$8 = stroke;
            this.setNeedRepaint(true);
        },
        getVisible: function() {
            return this.$9;
        },
        setVisible: function(VisibleValue) {
            this.$9 = VisibleValue;
            this.setNeedRepaint(true);
        },
        getNeedRepaint: function() {
            return this.$A;
        },
        setNeedRepaint: function(need) {
            this.$A = need;
        },
        isBindingEnabled: function() {
            return this.$B;
        },
        bindingEnabled: function(enabled) {
            this.$B = enabled;
        },
        recalculate: function() {
            try {
                if (this.$B && this.$17 != null && this.getInstrument().initializingIsFinished()) {
                    this.$17(this, ss.EventArgs.Empty);
                }
            } catch ($0) {}
        },
        onPaint: function(painter, fill, stroke) {},
        paint: function(painter) {
            var $0 = this.getFill();
            var $1 = this.getStroke();
            var $2 = this.getStyle();
            if ($2 != null && !!$2 && $2 !== 'Default') {
                var $3 = this.getCurrentStyle();
                if ($3 != null) {
                    if ($3.getFill() != null) {
                        $0 = $3.getFill();
                    }
                    if ($3.getStroke() != null) {
                        $1 = $3.getStroke();
                    }
                }
            }
            painter.setContext(this);
            this.onPaint(painter, $0, $1);
        },
        totallRefreshElement: function() {
            var $0 = this.getParent();
            if ($0 != null) {
                $0.totallRefreshElement();
            } else {
                this.$1E();
            }
        },
        $1D: false,
        getRecalculateAll: function() {
            return this.$1D;
        },
        setRecalculateAll: function(recalculateAllValue) {
            this.$1D = recalculateAllValue;
        },
        refreshElement: function() {
            var $0 = this.getInstrument();
            if ($0 == null) {
                return;
            }
            var $1 = $0.getPainter();
            if ($1 == null || this.getRecalculateAll()) {
                this.totallRefreshElement();
            } else {
                this.paint($1);
                this.$1E();
            }
        },
        $1E: function() {
            if (!ss.isNullOrUndefined(this.$16)) {
                this.$16(this, ss.EventArgs.Empty);
            }
        },
        setInvalidationHandler: function(handler) {
            this.$16 = handler;
        },
        getBoundedBox: function() {
            throw new Error('this is virtual method of WidgetElement');
        },
        getHitTest: function(point) {
            return false;
        },
        getElementAt: function(point) {
            if (!this.$4) {
                return null;
            }
            if (!this.$1B) {
                return null;
            }
            if (!this.getVisible()) {
                return null;
            }
            if (!this.getHitTest(point)) {
                return null;
            }
            return this;
        },
        doMouseDown: function(args) {
            if (this.getActive()) {
                this.onMouseDown(args);
                if ((this.getParent() != null) && !this.getBreakEventsBubbling()) {
                    this.getParent().doMouseDown(args);
                }
            }
        },
        doMouseLeave: function(args) {
            if (this.getActive()) {
                this.onMouseLeave(args);
                if ((this.getParent() != null) && !this.getBreakEventsBubbling()) {
                    this.getParent().doMouseLeave(args);
                }
            }
        },
        doMouseEnter: function(args) {
            if (this.getActive()) {
                this.onMouseEnter(args);
                if ((this.getParent() != null) && !this.getBreakEventsBubbling()) {
                    this.getParent().doMouseEnter(args);
                }
            }
        },
        doMouseMove: function(args) {
            if (this.getActive()) {
                this.onMouseMove(args);
                if ((this.getParent() != null) && !this.getBreakEventsBubbling()) {
                    this.getParent().doMouseMove(args);
                }
            }
        },
        doMouseUp: function(args) {
            if (this.getActive()) {
                this.onMouseUp(args);
                if ((this.getParent() != null) && !this.getBreakEventsBubbling()) {
                    this.getParent().doMouseUp(args);
                }
            }
        },
        onMouseDown: function(args) {
            var $0 = this.$15[PerfectWidgets.Model.BaseElements.WidgetElement.$F];
            if ($0 != null) {
                $0(this, args);
            }
        },
        onRecalculate: function() {
            if (this.isBindingEnabled() && this.$17 != null) {
                this.$17(this, ss.EventArgs.Empty);
            }
        },
        setMouseDownHandler: function(handler) {
            this.$1F(PerfectWidgets.Model.BaseElements.WidgetElement.$F, handler);
        },
        onMouseLeave: function(args) {
            var $0 = this.$15[PerfectWidgets.Model.BaseElements.WidgetElement.$10];
            if ($0 != null) {
                $0(this, args);
            }
            this.getToolTipElement().setNeedToolTip(false);
            this.getToolTipElement().setCurrentText('');
            this.getToolTipElement().setNeedRepaint(true);
            this.getToolTipElement().refreshElement();
        },
        setMouseLeaveHandler: function(handler) {
            this.$1F(PerfectWidgets.Model.BaseElements.WidgetElement.$10, handler);
        },
        onMouseEnter: function(args) {
            var $0 = this.$15[PerfectWidgets.Model.BaseElements.WidgetElement.$11];
            if ($0 != null) {
                $0(this, args);
            }
        },
        setMouseEnterHandler: function(handler) {
            this.$1F(PerfectWidgets.Model.BaseElements.WidgetElement.$11, handler);
        },
        onMouseMove: function(args) {
            var $0 = this.$15[PerfectWidgets.Model.BaseElements.WidgetElement.$12];
            if ($0 != null) {
                $0(this, args);
            }
            if (this.getToolTipValue() != null) {
                this.getToolTipElement().setNeedToolTip(true);
                this.getToolTipElement().setCurrentText(this.getToolTipValue());
                this.getToolTipElement().setLocation(args.getManipulationOrigin().minus(this.getToolTipElement().getSize()));
                this.getToolTipElement().refreshElement();
            }
        },
        setMouseMoveHandler: function(handler) {
            this.$1F(PerfectWidgets.Model.BaseElements.WidgetElement.$12, handler);
        },
        onMouseUp: function(args) {
            var $0 = this.$15[PerfectWidgets.Model.BaseElements.WidgetElement.$13];
            if ($0 != null) {
                $0(this, args);
            }
        },
        setMouseUpHandler: function(handler) {
            this.$1F(PerfectWidgets.Model.BaseElements.WidgetElement.$13, handler);
        },
        $1F: function($p0, $p1) {
            this.$15[$p0] = $p1;
        },
        getByName: function(name) {
            if (!this.getName().compareTo(name)) {
                return this;
            } else {
                return null;
            }
        },
        getRealPosition: function(point) {
            var $0 = this.getTransformation();
            var $1 = null;
            if ($0 != null) {
                $1 = $0.reverse(point);
            } else {
                $1 = point;
            }
            return $1;
        },
        $20: null,
        getToolTipValue: function() {
            return this.$20;
        },
        setToolTipValue: function(toolTipValueValue) {
            this.$20 = toolTipValueValue;
        },
        getToolTipElement: function() {
            return PerfectWidgets.Model.BaseElements.WidgetElement.$21;
        },
        setToolTipElement: function(toolTipElementValue) {
            PerfectWidgets.Model.BaseElements.WidgetElement.$21 = toolTipElementValue;
        },
        $22: '',
        getStyle: function() {
            return this.$22;
        },
        setStyle: function(styleValue) {
            if (this.$22 !== styleValue) {
                this.$22 = styleValue;
                this.setNeedRepaint(true);
                this.refreshElement();
            }
        },
        getStyleByName: function(name) {
            var $0 = this.getInstrument();
            if ($0 != null) {
                return $0.getStyleByName(name);
            } else {
                return null;
            }
        },
        getCurrentStyle: function() {
            return this.getStyleByName(this.getStyle());
        }
    }
    PerfectWidgets.Model.BaseElements.Bevel = function() {}
    PerfectWidgets.Model.BaseElements.Composite = function() {
        this.$23 = new PerfectWidgets.Model.BaseElements.ElementsCollection();
        PerfectWidgets.Model.BaseElements.Composite.initializeBase(this);
    }
    PerfectWidgets.Model.BaseElements.Composite.prototype = {
        getElements: function() {
            return this.$23;
        },
        setClassName: function(className) {
            for (var $0 = 0; $0 < this.$23.count(); $0++) {
                this.$23.get_item($0).setClassName(className);
            }
        },
        getByName: function(name) {
            if (this.getName() === name) {
                return this;
            } else {
                var $0 = this.getElements();
                for (var $1 = 0; $1 < $0.count(); $1++) {
                    var $2 = $0.get_item($1);
                    var $3 = $2.getByName(name);
                    if ($3 != null) {
                        return $3;
                    }
                }
                return null;
            }
        },
        onPaint: function(painter, fill, stroke) {
            painter.setContext(this);
            this.onRecalculate();
            var $0 = this.getElements();
            for (var $1 = 0; $1 < $0.count(); $1++) {
                var $2 = $0.get_item($1);
                $2.paint(painter);
            }
        },
        setNeedRepaint: function(need) {
            PerfectWidgets.Model.BaseElements.Composite.callBaseMethod(this, 'setNeedRepaint', [need]);
            if (need) {
                var $0 = this.getElements();
                var $1 = $0.count();
                for (var $2 = 0; $2 < $1; $2++) {
                    var $3 = $0.get_item($2);
                    $3.setNeedRepaint(need);
                }
            }
        },
        getElementAt: function(point) {
            var $0 = (this.getTransformation() == null) ? point : this.getTransformation().reverse(point);
            var $1 = this.getElements();
            for (var $2 = $1.count() - 1; $2 >= 0; $2--) {
                var $3 = $1.get_item($2).getElementAt($0);
                if ($3 != null) {
                    return $3;
                }
            }
            return PerfectWidgets.Model.BaseElements.Composite.callBaseMethod(this, 'getElementAt', [$0]);
        },
        getBoundedBox: function() {
            var $0 = this.getElements();
            var $1 = $0.get_item(0).getBoundedBox();
            for (var $2 = 1; $2 < $0.count(); $2++) {
                var $3 = $0.get_item($2).getBoundedBox();
                var $4 = Math.min($1.x, $3.x);
                var $5 = Math.min($1.y, $3.y);
                var $6 = Math.max($1.x + $1.width, $3.x + $3.width);
                var $7 = Math.max($1.y + $1.height, $3.y + $3.height);
                $1 = new PerfectWidgets.Framework.DataObjects.VectorRectangle($4, $5, $6 - $4, $7 - $5);
            }
            return $1;
        },
        getHitTest: function(point) {
            var $0 = PerfectWidgets.Model.BaseElements.Composite.callBaseMethod(this, 'getHitTest', [point]);
            var $1 = this.getElements();
            for (var $2 = 0; $2 < $1.count(); $2++) {
                $0 = $0 || $1.get_item($2).getHitTest(point);
            }
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.ElementsCollection = function() {
        this.$0 = [];
    }
    PerfectWidgets.Model.BaseElements.ElementsCollection.prototype = {
        remove: function(element) {
            this.$0.remove(element);
        },
        add: function(element, parent) {
            element.setParent(parent);
            this.$0.add(element);
        },
        insert: function(position, element) {
            this.$0.insert(position, element);
        },
        contains: function(value) {
            return this.$0.contains(value);
        },
        count: function() {
            return this.$0.length;
        },
        get_item: function(index) {
            return this.$0[index];
        }
    }
    PerfectWidgets.Model.BaseElements.Instrument = function() {
        PerfectWidgets.Model.BaseElements.Instrument.initializeBase(this);
        this.$27 = PerfectWidgets.Framework.DataObjects.Vector.empty;
    }
    PerfectWidgets.Model.BaseElements.Instrument.createEmptyInstrument = function() {
        var $0 = new PerfectWidgets.Model.BaseElements.Instrument();
        $0.setName('Instrument');
        return $0;
    }
    PerfectWidgets.Model.BaseElements.Instrument.prototype = {
        $24: null,
        $25: true,
        $26: false,
        $27: null,
        $28: null,
        $29: false,
        $2A: null,
        getPainter: function() {
            return this.$2A;
        },
        endInitializing: function() {
            this.$29 = true;
            this.$2B(Type.safeCast(this, PerfectWidgets.Model.BaseElements.Composite));
        },
        $2B: function($p0) {
            var $0 = $p0.getElements();
            for (var $1 = 0; $1 < $0.count(); $1++) {
                $0.get_item($1).$19(true);
                if (Type.canCast($0.get_item($1), PerfectWidgets.Model.BaseElements.Composite)) {
                    this.$2B(Type.safeCast($0.get_item($1), PerfectWidgets.Model.BaseElements.Composite));
                }
            }
        },
        initializingIsFinished: function() {
            return this.$29;
        },
        getUniqueClassName: function() {
            return this.$24;
        },
        setUniqueClassName: function(UniqueClassNameValue) {
            this.$24 = UniqueClassNameValue;
        },
        getFullName: function() {
            return this.$24 + '_' + PerfectWidgets.Model.BaseElements.Instrument.callBaseMethod(this, 'getFullName');
        },
        getEnable: function() {
            return this.$25;
        },
        setEnable: function(enabled) {
            if (this.$25 !== enabled) {
                this.$25 = enabled;
            }
        },
        getIsFocused: function() {
            return this.$26;
        },
        setIsFocused: function(IsFocusedValue) {
            if (this.$26 !== IsFocusedValue) {
                this.$26 = IsFocusedValue;
                this.refreshElement();
            }
            this.$26 = IsFocusedValue;
        },
        getSize: function() {
            return this.$27;
        },
        setSize: function(SizeValue) {
            if (!this.$27.equals(SizeValue)) {
                this.$27 = SizeValue;
                this.refreshElement();
            }
        },
        getBevel: function() {
            return this.$28;
        },
        setBevel: function(BevelValue) {
            this.$28 = BevelValue;
            this.setNeedRepaint(true);
        },
        getElementAt: function(point) {
            return PerfectWidgets.Model.BaseElements.Instrument.callBaseMethod(this, 'getElementAt', [point]);
        },
        onPaint: function(painter, fill, stroke) {
            this.$2A = painter;
            painter.setContext(this);
            this.onRecalculate();
            painter.createGroup();
            if (this.getBevel() != null) {
                this.getBevel().paint(this.getBoundedBox(), painter);
            }
            PerfectWidgets.Model.BaseElements.Instrument.callBaseMethod(this, 'onPaint', [painter, fill, stroke]);
            painter.endGroup();
        },
        $2C: null,
        $2D: null,
        getStyles: function() {
            return this.$2D;
        },
        setStyles: function(stylesValue) {
            this.$2D = stylesValue;
            this.$2C = new PerfectWidgets.Framework.Styles.StyleCollection();
            this.$2C.clear();
            var $enum1 = ss.IEnumerator.getEnumerator(this.$2D);
            while ($enum1.moveNext()) {
                var $0 = $enum1.current;
                this.$2C.add($0);
            }
        },
        getStyleCollection: function() {
            return this.$2C;
        },
        setStyleCollection: function(styleCollectionValue) {},
        getStyleByName: function(name) {
            if (!name) {
                return null;
            }
            var $0 = this.getStyleCollection().getStyleByName(name);
            return $0;
        }
    }
    PerfectWidgets.Model.BaseElements.Parameter = function() {}
    PerfectWidgets.Model.BaseElements.Parameter.prototype = {
        $0: null,
        getName: function() {
            return this.$0;
        },
        setName: function(NameValue) {
            this.$0 = NameValue;
        },
        $1: null,
        getElementName: function() {
            return this.$1;
        },
        setElementName: function(ElementNameValue) {
            this.$1 = ElementNameValue;
        },
        $2: null,
        getPropertyName: function() {
            return this.$2;
        },
        setPropertyName: function(PropertyNameValue) {
            this.$2 = PropertyNameValue;
        }
    }
    PerfectWidgets.Model.BaseElements.ParameterCollection = function() {}
    PerfectWidgets.Model.BaseElements.ParameterCollection.prototype = {
        $0: null,
        remove: function(parameter) {
            this.$0.remove(parameter);
        },
        add: function(parameter) {
            this.$0.add(parameter);
        },
        insert: function(position, parameter) {
            this.$0.insert(position, parameter);
        },
        contains: function(parameter) {
            return this.$0.contains(parameter);
        },
        count: function() {
            return this.$0.length;
        },
        get_item: function(ParameterName) {
            for (var $0 = 0; $0 < this.$0.length; $0++) {
                if (this.$0[$0].getName() === ParameterName) {
                    return this.$0[$0];
                }
            }
            return null;
        }
    }
    Type.registerNamespace('PerfectWidgets.Model.Drawing');
    PerfectWidgets.Model.Drawing.IPainter = function() {};
    PerfectWidgets.Model.Drawing.IPainter.registerInterface('PerfectWidgets.Model.Drawing.IPainter');
    PerfectWidgets.Model.Drawing.DigitPainter = function(digits) {
        this._digits = digits;
    }
    PerfectWidgets.Model.Drawing.DigitPainter.prototype = {
        _digits: null,
        _segmentPaths: null,
        _colonPaths: null,
        _dotPath: null,
        clearRegions: function() {
            this._segmentPaths = null;
        }
    }
    PerfectWidgets.Model.Drawing.GeneralDigitStyle = function(digits) {
        PerfectWidgets.Model.Drawing.GeneralDigitStyle.initializeBase(this, [digits]);
    }
    PerfectWidgets.Model.Drawing.GeneralDigitStyle.prototype = {
        $0: function($p0, $p1) {
            var $0 = new Array($p1.length);
            if (!!this._digits.getStyleID()) {
                var $1 = this._digits.getDigitHeight();
                var $2 = $1 * this._digits.getOverhang();
                for (var $3 = 0; $3 < $p1.length; $3++) {
                    $p1[$3].x = $p1[$3].x + $2 * (1 - $p1[$3].y / $1);
                }
            }
            for (var $4 = 0; $4 < $p1.length; $4++) {
                $0[$4] = $p1[$4];
            }
            this._segmentPaths[$p0] = $0;
        },
        $1: function() {
            if (this._segmentPaths == null) {
                this._segmentPaths = new Array(10);
                var $0 = this._digits.getDigitHeight();
                var $1 = this._digits.getDigitWidth();
                var $2 = this._digits.getSegmentThickness();
                var $3 = $0 / 2;
                var $4 = $1 / 2;
                var $5 = $2 / 2;
                var $6 = this._digits.getSegmentSpace() / 2;
                var $7 = new PerfectWidgets.Framework.DataObjects.Vector($2, $2);
                var $8 = new PerfectWidgets.Framework.DataObjects.Vector(-$2, $2);
                var $9 = new PerfectWidgets.Framework.DataObjects.Vector($1, $0);
                var $A = this._digits.getSkew();
                var $B = ($6 / 2);
                this.$0(0, [new PerfectWidgets.Framework.DataObjects.Vector(0 + $A * $2 * 2, 0), new PerfectWidgets.Framework.DataObjects.Vector(0 + $A * $7.x + $B / 2, $A * $7.y - $B / 2), new PerfectWidgets.Framework.DataObjects.Vector(0 + $7.x + $B, $7.y), new PerfectWidgets.Framework.DataObjects.Vector($1 + $8.x - $B, $8.y), new PerfectWidgets.Framework.DataObjects.Vector($1 + $A * $8.x - $B / 2, $A * $8.y - $B / 2), new PerfectWidgets.Framework.DataObjects.Vector($1 - $A * $2 * 2, 0)]);
                this.$0(1, [new PerfectWidgets.Framework.DataObjects.Vector(0 + $A * $2 * 2, $0 - 0), new PerfectWidgets.Framework.DataObjects.Vector(0 + $A * $7.x + $B / 2, $0 - ($A * $7.y - $B / 2)), new PerfectWidgets.Framework.DataObjects.Vector(0 + $7.x + $B, $0 - ($7.y)), new PerfectWidgets.Framework.DataObjects.Vector($1 + $8.x - $B, $0 - ($8.y)), new PerfectWidgets.Framework.DataObjects.Vector($1 + $A * $8.x - $B / 2, $0 - ($A * $8.y - $B / 2)), new PerfectWidgets.Framework.DataObjects.Vector($1 - $A * $2 * 2, $0 - 0)]);
                this.$0(2, [new PerfectWidgets.Framework.DataObjects.Vector(0, $A * $2 * 2), new PerfectWidgets.Framework.DataObjects.Vector(0 + $A * $7.x - $B / 2, 0 + $A * $7.y + $B / 2), new PerfectWidgets.Framework.DataObjects.Vector(0 + $7.x, 0 + $7.y + $B), new PerfectWidgets.Framework.DataObjects.Vector($2, $3 - $5 - $B), new PerfectWidgets.Framework.DataObjects.Vector($5, $3 - $B), new PerfectWidgets.Framework.DataObjects.Vector(0, $3 - $5 - $B)]);
                this.$0(3, [new PerfectWidgets.Framework.DataObjects.Vector($1, $A * $2 * 2), new PerfectWidgets.Framework.DataObjects.Vector($1 - ($A * $7.x - $B / 2), 0 + $A * $7.y + $B / 2), new PerfectWidgets.Framework.DataObjects.Vector($1 - $7.x, 0 + $7.y + $B), new PerfectWidgets.Framework.DataObjects.Vector($1 - $2, $3 - $5 - $B), new PerfectWidgets.Framework.DataObjects.Vector($1 - $5, $3 - $B), new PerfectWidgets.Framework.DataObjects.Vector($1, $3 - $5 - $B)]);
                this.$0(4, [new PerfectWidgets.Framework.DataObjects.Vector(0, $0 - $A * $2 * 2), new PerfectWidgets.Framework.DataObjects.Vector(0 + $A * $7.x - $B / 2, $0 - ($A * $7.y + $B / 2)), new PerfectWidgets.Framework.DataObjects.Vector(0 + $7.x, $0 - ($7.y + $B)), new PerfectWidgets.Framework.DataObjects.Vector($2, $0 - ($3 - $5 - $B)), new PerfectWidgets.Framework.DataObjects.Vector($5, $0 - ($3 - $B)), new PerfectWidgets.Framework.DataObjects.Vector(0, $0 - ($3 - $5 - $B))]);
                this.$0(5, [new PerfectWidgets.Framework.DataObjects.Vector($1, $0 - $A * $2 * 2), new PerfectWidgets.Framework.DataObjects.Vector($1 - ($A * $7.x - $B / 2), $0 - ($A * $7.y + $B / 2)), new PerfectWidgets.Framework.DataObjects.Vector($1 - $7.x, $0 - ($7.y + $B)), new PerfectWidgets.Framework.DataObjects.Vector($1 - $2, $0 - ($3 - $5 - $B)), new PerfectWidgets.Framework.DataObjects.Vector($1 - $5, $0 - ($3 - $B)), new PerfectWidgets.Framework.DataObjects.Vector($1, $0 - ($3 - $5 - $B))]);
                this.$0(6, [new PerfectWidgets.Framework.DataObjects.Vector($5 + $B, $3), new PerfectWidgets.Framework.DataObjects.Vector($2 + $B, $3 - $5), new PerfectWidgets.Framework.DataObjects.Vector($1 - ($2 + $B), $3 - $5), new PerfectWidgets.Framework.DataObjects.Vector($1 - ($5 + $B), $3), new PerfectWidgets.Framework.DataObjects.Vector($1 - ($2 + $B), $0 - ($3 - $5)), new PerfectWidgets.Framework.DataObjects.Vector($2 + $B, $0 - ($3 - $5))]);
            }
        },
        $2: function() {
            if (this._dotPath == null || this._colonPaths == null) {
                var $0 = this._digits.getDigitHeight();
                var $1 = this._digits.getDigitWidth();
                var $2 = this._digits.getSegmentThickness();
                var $3 = this._digits.getSegmentSpace();
                var $4 = $0 / 2;
                var $5 = $1 / 2;
                var $6 = $2 / 2;
                var $7 = $3 / 2;
                var $8 = $0;
                var $9 = $1;
                var $A = $2;
                var $B = new PerfectWidgets.Framework.DataObjects.Vector($2, $2);
                var $C = new PerfectWidgets.Framework.DataObjects.Vector(-$2, $2);
                var $D = new PerfectWidgets.Framework.DataObjects.Vector($1, $0);
                var $E = this._digits.getSkew();
                var $F = ($E * $A / 2);
                var $10 = $0 * this._digits.getOverhang();
                var $11 = 8;
                var $12 = [new PerfectWidgets.Framework.DataObjects.Vector(0, $F), new PerfectWidgets.Framework.DataObjects.Vector($F, 0), new PerfectWidgets.Framework.DataObjects.Vector($A - $F, 0), new PerfectWidgets.Framework.DataObjects.Vector($A, $F), new PerfectWidgets.Framework.DataObjects.Vector($A, $A - $F), new PerfectWidgets.Framework.DataObjects.Vector($A - $F, $A), new PerfectWidgets.Framework.DataObjects.Vector($F, $A), new PerfectWidgets.Framework.DataObjects.Vector(0, $A - $F)];
                var $13 = new Array($11);
                for (var $16 = 0; $16 < $12.length; $16++) {
                    $13[$16] = new PerfectWidgets.Framework.DataObjects.Vector($12[$16].x, $8 - $A + $12[$16].y);
                    $13[$16].x += $10 * (1 - $13[$16].y / $0);
                }
                this._dotPath = this.$3($13);
                var $14 = new Array($11);
                var $15 = new Array($11);
                for (var $17 = 0; $17 < $12.length; $17++) {
                    $14[$17] = new PerfectWidgets.Framework.DataObjects.Vector($12[$17].x, $8 / 4 - $A / 2 + $12[$17].y);
                    $14[$17].x += $10 * (1 - $14[$17].y / $0);
                    $15[$17] = new PerfectWidgets.Framework.DataObjects.Vector($12[$17].x, 3 * $8 / 4 - $A / 2 + $12[$17].y);
                    $15[$17].x += $10 * (1 - $15[$17].y / $0);
                }
                this._colonPaths = new Array(2);
                this._colonPaths[0] = this.$3($14);
                this._colonPaths[1] = this.$3($15);
            }
        },
        $3: function($p0) {
            var $0 = new Array($p0.length);
            for (var $1 = 0; $1 < $p0.length; $1++) {
                $0[$1] = $p0[$1];
            }
            return $0;
        },
        prepareSegmentsIfNeeded: function() {
            var $0 = this._digits.getStyleID();
            if (!!$0) {
                this.$1();
                this.$2();
                return;
            }
            if (this._segmentPaths == null) {
                this._segmentPaths = new Array(10);
                var $1 = this._digits.getDigitHeight() / 2;
                var $2 = this._digits.getSegmentThickness() / 2;
                var $3 = this._digits.getSegmentSpace();
                var $4 = this._digits.getDigitWidth();
                var $5 = this._digits.getDigitHeight();
                var $6 = this._digits.getSegmentThickness();
                this.$0(0, [new PerfectWidgets.Framework.DataObjects.Vector($3, 0), new PerfectWidgets.Framework.DataObjects.Vector($4 - $3, 0), new PerfectWidgets.Framework.DataObjects.Vector($4 - $3 - $6, $6), new PerfectWidgets.Framework.DataObjects.Vector($3 + $6, $6)]);
                this.$0(1, [new PerfectWidgets.Framework.DataObjects.Vector($3, $5), new PerfectWidgets.Framework.DataObjects.Vector($4 - $3, $5), new PerfectWidgets.Framework.DataObjects.Vector($4 - $3 - $6, $5 - $6), new PerfectWidgets.Framework.DataObjects.Vector($3 + $6, $5 - $6)]);
                this.$0(2, [new PerfectWidgets.Framework.DataObjects.Vector(0, $3), new PerfectWidgets.Framework.DataObjects.Vector(0, $1 - $3), new PerfectWidgets.Framework.DataObjects.Vector($6, $1 - $3 - $6), new PerfectWidgets.Framework.DataObjects.Vector($6, $3 + $6)]);
                this.$0(3, [new PerfectWidgets.Framework.DataObjects.Vector($4, $3), new PerfectWidgets.Framework.DataObjects.Vector($4, $1 - $3), new PerfectWidgets.Framework.DataObjects.Vector($4 - $6, $1 - $3 - $6), new PerfectWidgets.Framework.DataObjects.Vector($4 - $6, $3 + $6)]);
                this.$0(4, [new PerfectWidgets.Framework.DataObjects.Vector(0, $5 - $3), new PerfectWidgets.Framework.DataObjects.Vector(0, $5 - $1 + $3), new PerfectWidgets.Framework.DataObjects.Vector($6, $5 - $1 + $3 + $6), new PerfectWidgets.Framework.DataObjects.Vector($6, $5 - $3 - $6)]);
                this.$0(5, [new PerfectWidgets.Framework.DataObjects.Vector($4, $5 - $3), new PerfectWidgets.Framework.DataObjects.Vector($4, $5 - $1 + $3), new PerfectWidgets.Framework.DataObjects.Vector($4 - $6, $5 - $1 + $3 + $6), new PerfectWidgets.Framework.DataObjects.Vector($4 - $6, $5 - $3 - $6)]);
                this.$0(6, [new PerfectWidgets.Framework.DataObjects.Vector($3, $1), new PerfectWidgets.Framework.DataObjects.Vector($3 + $2, $1 - $2), new PerfectWidgets.Framework.DataObjects.Vector($4 - $3 - $2, $1 - $2), new PerfectWidgets.Framework.DataObjects.Vector($4 - $3, $1), new PerfectWidgets.Framework.DataObjects.Vector($4 - $3 - $2, $1 + $2), new PerfectWidgets.Framework.DataObjects.Vector($3 + $2, $1 + $2)]);
            }
        },
        formColon: function(active, shift) {
            var $0 = this._digits.getSuffix();
            this._digits.setSuffix($0.substr(0, $0.length - 1) + '_upperDot');
            if (!this._digits.getStyleID()) {
                var $1 = this._digits.getDigitHeight() * (1 / 3);
                active.moveTo(new PerfectWidgets.Framework.DataObjects.Vector(0, $1).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(this._digits.getSegmentThickness(), $1).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(this._digits.getSegmentThickness(), $1 + this._digits.getSegmentThickness()).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(0, $1 + this._digits.getSegmentThickness()).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(0, $1).add(shift));
            } else {
                active.moveTo(this._colonPaths[0][0].add(shift));
                for (var $2 = 1; $2 < this._colonPaths[0].length; $2++) {
                    active.addLine(this._colonPaths[0][$2].add(shift));
                }
                active.addLine(this._colonPaths[0][0].add(shift));
            }
            this._digits.setSuffix($0.substr(0, $0.length - 1) + '_bottomDot');
            if (!this._digits.getStyleID()) {
                var $3 = this._digits.getDigitHeight() * (2 / 3);
                active.moveTo(new PerfectWidgets.Framework.DataObjects.Vector(0, $3).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(this._digits.getSegmentThickness(), $3).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(this._digits.getSegmentThickness(), $3 + this._digits.getSegmentThickness()).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(0, $3 + this._digits.getSegmentThickness()).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(0, $3).add(shift));
            } else {
                active.moveTo(this._colonPaths[1][0].add(shift));
                for (var $4 = 1; $4 < this._colonPaths[1].length; $4++) {
                    active.addLine(this._colonPaths[1][$4].add(shift));
                }
                active.addLine(this._colonPaths[1][0].add(shift));
            }
        },
        formDot: function(active, shift) {
            var $0 = this._digits.getSuffix();
            this._digits.setSuffix($0.substr(0, $0.length - 1) + (1).toString());
            if (!this._digits.getStyleID()) {
                active.moveTo(new PerfectWidgets.Framework.DataObjects.Vector(0, this._digits.getDigitHeight()).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(this._digits.getSegmentThickness(), this._digits.getDigitHeight()).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(this._digits.getSegmentThickness(), this._digits.getDigitHeight() + this._digits.getSegmentThickness()).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(0, this._digits.getDigitHeight() + this._digits.getSegmentThickness()).add(shift));
                active.addLine(new PerfectWidgets.Framework.DataObjects.Vector(0, this._digits.getDigitHeight()).add(shift));
            } else {
                active.moveTo(this._dotPath[0].add(shift));
                for (var $1 = 1; $1 < this._dotPath.length; $1++) {
                    active.addLine(this._dotPath[$1].add(shift));
                }
                active.addLine(this._dotPath[0].add(shift));
            }
        },
        formSegments: function(active, inactive, segmentType, shift) {
            var $0;
            var $1 = segmentType;
            var $2 = new PerfectWidgets.Framework.Drawing.SolidFill(this._digits.getActiveColor());
            var $3 = new PerfectWidgets.Framework.Drawing.SolidFill(this._digits.getInactiveColor());
            for (var $4 = 0; $4 < 7; $4++) {
                var $5;
                if (this._segmentPaths[$4] != null) {
                    if (($1 & 1) === 1) {
                        $0 = active;
                    } else {
                        $0 = inactive;
                    }
                    var $6 = this._digits.getSuffix();
                    this._digits.setSuffix($6.substr(0, $6.length - 1) + $4.toString());
                    var $7 = this._segmentPaths[$4];
                    $0.moveTo($7[0].add(shift));
                    for (var $8 = 1; $8 < $7.length; $8++) {
                        $0.addLine($7[$8].add(shift));
                    }
                    $0.addLine($7[0].add(shift));
                    $1 >>= 1;
                }
            }
        }
    }
    PerfectWidgets.Model.Drawing.ValuePathPair = function(value, path) {
        this.$0 = value;
        this.$1 = path;
    }
    PerfectWidgets.Model.Drawing.ValuePathPair.prototype = {
        $0: 0,
        get_value: function() {
            return this.$0;
        },
        set_value: function(value) {
            this.$0 = value;
            return value;
        },
        $1: null,
        get_path: function() {
            return this.$1;
        },
        set_path: function(value) {
            this.$1 = value;
            return value;
        }
    }
    Type.registerNamespace('PerfectWidgets.Model.Manipulator');
    PerfectWidgets.Model.Manipulator.ManipulationArguments = function(manipulationOrigin, deltaManipulation, view, isInDiv) {
        this.$0 = Date.get_now().getDate();
        this.$1 = manipulationOrigin;
        this.$2 = deltaManipulation;
        this.$3 = view;
        this.$4 = isInDiv;
    }
    PerfectWidgets.Model.Manipulator.ManipulationArguments.prototype = {
        $0: 0,
        $1: null,
        $2: null,
        $3: null,
        $4: false,
        getTimestamp: function() {
            return this.$0;
        },
        getManipulationOrigin: function() {
            return this.$1;
        },
        getDeltaManipulation: function() {
            return this.$2;
        },
        view: function() {
            return this.$3;
        },
        isInDiv: function() {
            return this.$4;
        }
    }
    PerfectWidgets.Model.Manipulator.ManipulationDelta = function(rotation, scale, translation) {
        this.$0 = rotation;
        this.$1 = scale;
        this.$2 = translation;
    }
    PerfectWidgets.Model.Manipulator.ManipulationDelta.prototype = {
        $0: 0,
        $1: null,
        $2: null,
        getRotation: function() {
            return this.$0;
        },
        getScale: function() {
            return this.$1;
        },
        getTranslation: function() {
            return this.$2;
        },
        toString: function() {
            return '[r:' + this.$0 + '; s:' + this.$1 + '; t:' + this.$2 + ']';
        }
    }
    Type.registerNamespace('PerfectWidgets.Model.Strategy');
    PerfectWidgets.Model.Strategy.BrowserStrategy = function() {}
    PerfectWidgets.Model.Strategy.BrowserStrategy.getInstance = function() {
        if (PerfectWidgets.Model.Strategy.BrowserStrategy.$0 == null) {
            PerfectWidgets.Model.Strategy.BrowserStrategy.$0 = new PerfectWidgets.Model.Strategy.BrowserStrategy();
        }
        return PerfectWidgets.Model.Strategy.BrowserStrategy.$0;
    }
    PerfectWidgets.Model.Strategy.BrowserStrategy.prototype = {
        postCreateGroup: function(painter) {
            painter.clearGroup();
        }
    }
    Type.registerNamespace('PerfectWidgets.Model.Transformation');
    PerfectWidgets.Model.Transformation._ViewTransformation = function() {
        PerfectWidgets.Model.Transformation._ViewTransformation.initializeBase(this);
    }
    PerfectWidgets.Model.Transformation._ViewTransformation.prototype = {
        apply: function($p0) {
            var $0 = PerfectWidgets.Framework.Drawing.Unit.convert($p0.x, PerfectWidgets.Framework.Drawing.Unit.internalUnit, PerfectWidgets.Framework.Drawing.Unit.pixel);
            var $1 = PerfectWidgets.Framework.Drawing.Unit.convert($p0.y, PerfectWidgets.Framework.Drawing.Unit.internalUnit, PerfectWidgets.Framework.Drawing.Unit.pixel);
            return new PerfectWidgets.Framework.DataObjects.Vector($0, $1);
        },
        reverse: function($p0) {
            var $0 = PerfectWidgets.Framework.Drawing.Unit.convert($p0.x, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
            var $1 = PerfectWidgets.Framework.Drawing.Unit.convert($p0.y, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
            return new PerfectWidgets.Framework.DataObjects.Vector($0, $1);
        },
        getTransformationMatrix: function() {
            var $0 = PerfectWidgets.Framework.Drawing.Unit.pixel.k / PerfectWidgets.Framework.Drawing.Unit.internalUnit.k;
            return PerfectWidgets.Framework.DataObjects.Matrix.buildScaleMatrix($0, $0);
        }
    }
    Type.registerNamespace('PerfectWidgets.Model.View');
    PerfectWidgets.Model.View.Tool = function() {}
    PerfectWidgets.Model.View.Tool.prototype = {
        onPointerOut: function(args) {},
        onPointerOver: function(args) {},
        onManipulationStarted: function(args) {},
        onManipulationEnded: function(args) {},
        onPointerMove: function(args) {},
        onPointerLeave: function(args) {},
        onPointerEnter: function(args) {},
        onDeltaChange: function(manipulationArguments) {}
    }
    PerfectWidgets.Model.View.AbstractView = function() {
        this.$0 = PerfectWidgets.Framework.DataObjects.Vector.empty;
    }
    PerfectWidgets.Model.View.AbstractView.prototype = {
        maxZoom: 100,
        minZoom: 0.1,
        _scale: null,
        getScale: function() {
            return this._scale;
        },
        setScale: function(ScaleValue) {
            this._scale = ScaleValue;
        },
        getOrigin: function() {
            return this.$0;
        },
        setOrigin: function(OriginValue) {
            this.$0 = OriginValue;
        },
        changeZoom: function(center, scale) {
            var $0 = this.getOrigin();
            var $1 = center.minus($0);
            var $2 = $1.multiply(scale);
            var $3 = $2.minus($1);
            this.setOrigin($0.minus($3));
            this.setScale(scale);
            this.getElement().setNeedRepaint(true);
            this.getElement().refreshElement();
        },
        locationToScreen: function(value) {
            return PerfectWidgets.Framework.DataObjects.Vector.empty;
        },
        valueToScreen: function(value) {
            return value.multiply(this.getScale());
        },
        scaleFromScreen: function(value) {
            return value.divide(this.getScale());
        }
    }
    PerfectWidgets.Model.View.ViewManager = function() {}
    PerfectWidgets.Model.View.ViewManager.prototype = {
        $0: null,
        getTool: function() {
            return this.$0;
        },
        setTool: function(ToolValue) {
            this.$0 = ToolValue;
        },
        $1: null,
        getView: function() {
            return this.$1;
        },
        setView: function(ViewValue) {
            this.$1 = ViewValue;
        },
        hitTest: function(x, y) {
            return false;
        }
    }
    PerfectWidgets.Model.Animation.EasingFunctions.registerClass('PerfectWidgets.Model.Animation.EasingFunctions');
    PerfectWidgets.Model.Animation.AbstractAnimation.registerClass('PerfectWidgets.Model.Animation.AbstractAnimation');
    PerfectWidgets.Model.Animation.ManualAnimation.registerClass('PerfectWidgets.Model.Animation.ManualAnimation', PerfectWidgets.Model.Animation.AbstractAnimation);
    PerfectWidgets.Model.BaseElements.WidgetElement.registerClass('PerfectWidgets.Model.BaseElements.WidgetElement');
    PerfectWidgets.Model.BaseElements.SimpleRectangleElement.registerClass('PerfectWidgets.Model.BaseElements.SimpleRectangleElement', PerfectWidgets.Model.BaseElements.WidgetElement);
    PerfectWidgets.Model.BaseElements.RectangleElement.registerClass('PerfectWidgets.Model.BaseElements.RectangleElement', PerfectWidgets.Model.BaseElements.SimpleRectangleElement);
    PerfectWidgets.Model.BaseElements.ArcBase.registerClass('PerfectWidgets.Model.BaseElements.ArcBase', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.Arc.registerClass('PerfectWidgets.Model.BaseElements.Arc', PerfectWidgets.Model.BaseElements.ArcBase);
    PerfectWidgets.Model.BaseElements.Composite.registerClass('PerfectWidgets.Model.BaseElements.Composite', PerfectWidgets.Model.BaseElements.WidgetElement);
    PerfectWidgets.Model.BaseElements.ButtonBase.registerClass('PerfectWidgets.Model.BaseElements.ButtonBase', PerfectWidgets.Model.BaseElements.Composite);
    PerfectWidgets.Model.BaseElements.Circle.registerClass('PerfectWidgets.Model.BaseElements.Circle', PerfectWidgets.Model.BaseElements.WidgetElement);
    PerfectWidgets.Model.BaseElements.CircularShape.registerClass('PerfectWidgets.Model.BaseElements.CircularShape', PerfectWidgets.Model.BaseElements.WidgetElement);
    PerfectWidgets.Model.BaseElements.CircularNotches.registerClass('PerfectWidgets.Model.BaseElements.CircularNotches', PerfectWidgets.Model.BaseElements.CircularShape);
    PerfectWidgets.Model.BaseElements.Colorizer.registerClass('PerfectWidgets.Model.BaseElements.Colorizer');
    PerfectWidgets.Model.BaseElements.DigitalText.registerClass('PerfectWidgets.Model.BaseElements.DigitalText', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.Frame.registerClass('PerfectWidgets.Model.BaseElements.Frame', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.Group.registerClass('PerfectWidgets.Model.BaseElements.Group', PerfectWidgets.Model.BaseElements.Composite);
    PerfectWidgets.Model.BaseElements.LineElement.registerClass('PerfectWidgets.Model.BaseElements.LineElement', PerfectWidgets.Model.BaseElements.WidgetElement);
    PerfectWidgets.Model.BaseElements.LinearNotches.registerClass('PerfectWidgets.Model.BaseElements.LinearNotches', PerfectWidgets.Model.BaseElements.LineElement);
    PerfectWidgets.Model.BaseElements.Odometer.registerClass('PerfectWidgets.Model.BaseElements.Odometer', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.Digits.registerClass('PerfectWidgets.Model.BaseElements.Digits', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.PushButton.registerClass('PerfectWidgets.Model.BaseElements.PushButton', PerfectWidgets.Model.BaseElements.ButtonBase);
    PerfectWidgets.Model.BaseElements.ScaleElement.registerClass('PerfectWidgets.Model.BaseElements.ScaleElement', PerfectWidgets.Model.BaseElements.WidgetElement, PerfectWidgets.Model.BaseElements.IScaleElement);
    PerfectWidgets.Model.BaseElements.ValuePresenterScaleElement.registerClass('PerfectWidgets.Model.BaseElements.ValuePresenterScaleElement', PerfectWidgets.Model.BaseElements.ScaleElement);
    PerfectWidgets.Model.BaseElements.LevelBase.registerClass('PerfectWidgets.Model.BaseElements.LevelBase', PerfectWidgets.Model.BaseElements.ValuePresenterScaleElement);
    PerfectWidgets.Model.BaseElements.RangedLevel.registerClass('PerfectWidgets.Model.BaseElements.RangedLevel', PerfectWidgets.Model.BaseElements.LevelBase);
    PerfectWidgets.Model.BaseElements.ScaleMarksBase.registerClass('PerfectWidgets.Model.BaseElements.ScaleMarksBase', PerfectWidgets.Model.BaseElements.ScaleElement);
    PerfectWidgets.Model.BaseElements.ScaleMarks.registerClass('PerfectWidgets.Model.BaseElements.ScaleMarks', PerfectWidgets.Model.BaseElements.ScaleMarksBase);
    PerfectWidgets.Model.BaseElements.ScaleLabelsBase.registerClass('PerfectWidgets.Model.BaseElements.ScaleLabelsBase', PerfectWidgets.Model.BaseElements.ScaleElement);
    PerfectWidgets.Model.BaseElements.ScaleTitle.registerClass('PerfectWidgets.Model.BaseElements.ScaleTitle', PerfectWidgets.Model.BaseElements.ScaleLabelsBase);
    PerfectWidgets.Model.BaseElements.ShapeBase.registerClass('PerfectWidgets.Model.BaseElements.ShapeBase');
    PerfectWidgets.Model.BaseElements.RectangleShape.registerClass('PerfectWidgets.Model.BaseElements.RectangleShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.EllipseShape.registerClass('PerfectWidgets.Model.BaseElements.EllipseShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.RoundRectangleShape.registerClass('PerfectWidgets.Model.BaseElements.RoundRectangleShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.TriangleShape.registerClass('PerfectWidgets.Model.BaseElements.TriangleShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.ArrowShape.registerClass('PerfectWidgets.Model.BaseElements.ArrowShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.RectTriangleShape.registerClass('PerfectWidgets.Model.BaseElements.RectTriangleShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.DiamondShape.registerClass('PerfectWidgets.Model.BaseElements.DiamondShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.ParallelogramShape.registerClass('PerfectWidgets.Model.BaseElements.ParallelogramShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.StarShape.registerClass('PerfectWidgets.Model.BaseElements.StarShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.CrossShape.registerClass('PerfectWidgets.Model.BaseElements.CrossShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.LineShape.registerClass('PerfectWidgets.Model.BaseElements.LineShape', PerfectWidgets.Model.BaseElements.ShapeBase);
    PerfectWidgets.Model.BaseElements.LinearLevel.registerClass('PerfectWidgets.Model.BaseElements.LinearLevel', PerfectWidgets.Model.BaseElements.LevelBase);
    PerfectWidgets.Model.BaseElements.Spring.registerClass('PerfectWidgets.Model.BaseElements.Spring', PerfectWidgets.Model.BaseElements.LineElement);
    PerfectWidgets.Model.BaseElements.Tank.registerClass('PerfectWidgets.Model.BaseElements.Tank', PerfectWidgets.Model.BaseElements.ValuePresenterScaleElement);
    PerfectWidgets.Model.BaseElements.Rectangle.registerClass('PerfectWidgets.Model.BaseElements.Rectangle', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.ToolTipElement.registerClass('PerfectWidgets.Model.BaseElements.ToolTipElement', PerfectWidgets.Model.BaseElements.Rectangle);
    PerfectWidgets.Model.BaseElements.TrialLabel.registerClass('PerfectWidgets.Model.BaseElements.TrialLabel', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.CustomLabels.registerClass('PerfectWidgets.Model.BaseElements.CustomLabels', PerfectWidgets.Model.BaseElements.ScaleLabelsBase);
    PerfectWidgets.Model.BaseElements.DockableTrajectoryBase.registerClass('PerfectWidgets.Model.BaseElements.DockableTrajectoryBase', PerfectWidgets.Model.BaseElements.Composite, PerfectWidgets.Model.BaseElements.ITrajectory);
    PerfectWidgets.Model.BaseElements._ElementPainter.registerClass('PerfectWidgets.Model.BaseElements._ElementPainter');
    PerfectWidgets.Model.BaseElements.Ellipse.registerClass('PerfectWidgets.Model.BaseElements.Ellipse', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.Gear.registerClass('PerfectWidgets.Model.BaseElements.Gear', PerfectWidgets.Model.BaseElements.CircularShape);
    PerfectWidgets.Model.BaseElements.Guide.registerClass('PerfectWidgets.Model.BaseElements.Guide', PerfectWidgets.Model.BaseElements.DockableTrajectoryBase);
    PerfectWidgets.Model.BaseElements.Highlight.registerClass('PerfectWidgets.Model.BaseElements.Highlight', PerfectWidgets.Model.BaseElements.CircularShape);
    PerfectWidgets.Model.BaseElements.Joint.registerClass('PerfectWidgets.Model.BaseElements.Joint', PerfectWidgets.Model.BaseElements.DockableTrajectoryBase);
    PerfectWidgets.Model.BaseElements.Label.registerClass('PerfectWidgets.Model.BaseElements.Label', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.LabelInfo.registerClass('PerfectWidgets.Model.BaseElements.LabelInfo');
    PerfectWidgets.Model.BaseElements.Line.registerClass('PerfectWidgets.Model.BaseElements.Line', PerfectWidgets.Model.BaseElements.LineElement);
    PerfectWidgets.Model.BaseElements.Needle.registerClass('PerfectWidgets.Model.BaseElements.Needle', PerfectWidgets.Model.BaseElements.LineElement);
    PerfectWidgets.Model.BaseElements.NeedlePoint.registerClass('PerfectWidgets.Model.BaseElements.NeedlePoint');
    PerfectWidgets.Model.BaseElements.NeedlePointCollection.registerClass('PerfectWidgets.Model.BaseElements.NeedlePointCollection');
    PerfectWidgets.Model.BaseElements.Picture.registerClass('PerfectWidgets.Model.BaseElements.Picture', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.PictureSet.registerClass('PerfectWidgets.Model.BaseElements.PictureSet', PerfectWidgets.Model.BaseElements.RectangleElement);
    PerfectWidgets.Model.BaseElements.Pie.registerClass('PerfectWidgets.Model.BaseElements.Pie', PerfectWidgets.Model.BaseElements.ArcBase);
    PerfectWidgets.Model.BaseElements.Polygon.registerClass('PerfectWidgets.Model.BaseElements.Polygon', PerfectWidgets.Model.BaseElements.CircularShape);
    PerfectWidgets.Model.BaseElements.PropertyEventArgs.registerClass('PerfectWidgets.Model.BaseElements.PropertyEventArgs', ss.EventArgs);
    PerfectWidgets.Model.BaseElements.RingSector.registerClass('PerfectWidgets.Model.BaseElements.RingSector', PerfectWidgets.Model.BaseElements.ArcBase);
    PerfectWidgets.Model.BaseElements.RoundedRectangle.registerClass('PerfectWidgets.Model.BaseElements.RoundedRectangle', PerfectWidgets.Model.BaseElements.Rectangle);
    PerfectWidgets.Model.BaseElements.RoundedVectorRectangle.registerClass('PerfectWidgets.Model.BaseElements.RoundedVectorRectangle', PerfectWidgets.Model.BaseElements.Rectangle);
    PerfectWidgets.Model.BaseElements.Scale.registerClass('PerfectWidgets.Model.BaseElements.Scale', PerfectWidgets.Model.BaseElements.Composite, PerfectWidgets.Model.BaseElements.IScale);
    PerfectWidgets.Model.BaseElements.ScaleLabels.registerClass('PerfectWidgets.Model.BaseElements.ScaleLabels', PerfectWidgets.Model.BaseElements.ScaleLabelsBase);
    PerfectWidgets.Model.BaseElements.SliderBase.registerClass('PerfectWidgets.Model.BaseElements.SliderBase', PerfectWidgets.Model.BaseElements.Composite, PerfectWidgets.Model.BaseElements.ISlider, PerfectWidgets.Model.Animation.IAnimatable, PerfectWidgets.Model.BaseElements.ILinkedSupported);
    PerfectWidgets.Model.BaseElements.Slider.registerClass('PerfectWidgets.Model.BaseElements.Slider', PerfectWidgets.Model.BaseElements.SliderBase);
    PerfectWidgets.Model.BaseElements.SmartValue.registerClass('PerfectWidgets.Model.BaseElements.SmartValue');
    PerfectWidgets.Model.BaseElements.Star.registerClass('PerfectWidgets.Model.BaseElements.Star', PerfectWidgets.Model.BaseElements.Polygon);
    PerfectWidgets.Model.BaseElements.TextItem.registerClass('PerfectWidgets.Model.BaseElements.TextItem');
    PerfectWidgets.Model.BaseElements.Ticks.registerClass('PerfectWidgets.Model.BaseElements.Ticks', PerfectWidgets.Model.BaseElements.ScaleMarksBase);
    PerfectWidgets.Model.BaseElements.TruncatedEllipse.registerClass('PerfectWidgets.Model.BaseElements.TruncatedEllipse', PerfectWidgets.Model.BaseElements.ArcBase);
    PerfectWidgets.Model.BaseElements.Bevel.registerClass('PerfectWidgets.Model.BaseElements.Bevel');
    PerfectWidgets.Model.BaseElements.ElementsCollection.registerClass('PerfectWidgets.Model.BaseElements.ElementsCollection');
    PerfectWidgets.Model.BaseElements.Instrument.registerClass('PerfectWidgets.Model.BaseElements.Instrument', PerfectWidgets.Model.BaseElements.Composite);
    PerfectWidgets.Model.BaseElements.Parameter.registerClass('PerfectWidgets.Model.BaseElements.Parameter');
    PerfectWidgets.Model.BaseElements.ParameterCollection.registerClass('PerfectWidgets.Model.BaseElements.ParameterCollection');
    PerfectWidgets.Model.Drawing.DigitPainter.registerClass('PerfectWidgets.Model.Drawing.DigitPainter');
    PerfectWidgets.Model.Drawing.GeneralDigitStyle.registerClass('PerfectWidgets.Model.Drawing.GeneralDigitStyle', PerfectWidgets.Model.Drawing.DigitPainter);
    PerfectWidgets.Model.Drawing.ValuePathPair.registerClass('PerfectWidgets.Model.Drawing.ValuePathPair');
    PerfectWidgets.Model.Manipulator.ManipulationArguments.registerClass('PerfectWidgets.Model.Manipulator.ManipulationArguments');
    PerfectWidgets.Model.Manipulator.ManipulationDelta.registerClass('PerfectWidgets.Model.Manipulator.ManipulationDelta');
    PerfectWidgets.Model.Strategy.BrowserStrategy.registerClass('PerfectWidgets.Model.Strategy.BrowserStrategy');
    PerfectWidgets.Model.Transformation._ViewTransformation.registerClass('PerfectWidgets.Model.Transformation._ViewTransformation', PerfectWidgets.Framework.Transformation.AbstractTransformation);
    PerfectWidgets.Model.View.Tool.registerClass('PerfectWidgets.Model.View.Tool');
    PerfectWidgets.Model.View.AbstractView.registerClass('PerfectWidgets.Model.View.AbstractView');
    PerfectWidgets.Model.View.ViewManager.registerClass('PerfectWidgets.Model.View.ViewManager');
    PerfectWidgets.Model.Animation.EasingFunctions.$0 = 1.70158;
    PerfectWidgets.Model.BaseElements.Digits.$2F = null;
    PerfectWidgets.Model.BaseElements.Digits.$30 = null;
    (function() {
        PerfectWidgets.Model.BaseElements.Digits.$2F = {};
        PerfectWidgets.Model.BaseElements.Digits.$2F['0'] = 127 - 64;
        PerfectWidgets.Model.BaseElements.Digits.$2F['1'] = 8 | 32;
        PerfectWidgets.Model.BaseElements.Digits.$2F['2'] = 127 - (4 | 32);
        PerfectWidgets.Model.BaseElements.Digits.$2F['3'] = 127 - (16 | 4);
        PerfectWidgets.Model.BaseElements.Digits.$2F['4'] = 127 - (1 | 2 | 16);
        PerfectWidgets.Model.BaseElements.Digits.$2F['5'] = 127 - (8 | 16);
        PerfectWidgets.Model.BaseElements.Digits.$2F['6'] = 127 - 8;
        PerfectWidgets.Model.BaseElements.Digits.$2F['7'] = 1 | 8 | 32;
        PerfectWidgets.Model.BaseElements.Digits.$2F['8'] = 127;
        PerfectWidgets.Model.BaseElements.Digits.$2F['9'] = 127 - 16;
        PerfectWidgets.Model.BaseElements.Digits.$2F[' '] = 0;
        PerfectWidgets.Model.BaseElements.Digits.$2F['-'] = 64;
        PerfectWidgets.Model.BaseElements.Digits.$30 = {};
    })();
    PerfectWidgets.Model.BaseElements.ShapeBase.$0 = [];
    PerfectWidgets.Model.BaseElements.ShapeBase.$1 = false;
    PerfectWidgets.Model.BaseElements.Tank.minDepthValue = 0.01;
    PerfectWidgets.Model.BaseElements.PropertyEventArgs.empty = new PerfectWidgets.Model.BaseElements.PropertyEventArgs();
    PerfectWidgets.Model.BaseElements.ScaleLabelsBase.$39 = 500;
    PerfectWidgets.Model.BaseElements.ScaleMarksBase._maxLabelsCount = 500;
    PerfectWidgets.Model.BaseElements.SmartValue.auto = null;
    (function() {
        PerfectWidgets.Model.BaseElements.SmartValue.auto = new PerfectWidgets.Model.BaseElements.SmartValue();
        PerfectWidgets.Model.BaseElements.SmartValue.auto._kind = 0;
        PerfectWidgets.Model.BaseElements.SmartValue.auto._value = 0;
    })();
    PerfectWidgets.Model.BaseElements.WidgetElement.$F = {};
    PerfectWidgets.Model.BaseElements.WidgetElement.$10 = {};
    PerfectWidgets.Model.BaseElements.WidgetElement.$11 = {};
    PerfectWidgets.Model.BaseElements.WidgetElement.$12 = {};
    PerfectWidgets.Model.BaseElements.WidgetElement.$13 = {};
    PerfectWidgets.Model.BaseElements.WidgetElement.$14 = {};
    PerfectWidgets.Model.BaseElements.WidgetElement.$21 = null;
    PerfectWidgets.Model.Strategy.BrowserStrategy.$0 = null;
    Type.registerNamespace('PerfectWidgets.Drawing');
    PerfectWidgets.Drawing.SvgBuilder = function(id) {
        this.$0 = id;
    }
    PerfectWidgets.Drawing.SvgBuilder.$1F = function($p0) {
        while ($p0.hasChildNodes()) {
            $p0.removeChild($p0.lastChild);
        }
    }
    PerfectWidgets.Drawing.SvgBuilder.prototype = {
        $0: null,
        $6: null,
        $7: null,
        $8: function($p0) {
            if ($p0 == null) {
                return '';
            }
            var $0 = new ss.StringBuilder();
            for (var $1 = 0; $1 < $p0.length; $1++) {
                $0.append(PerfectWidgets.Framework.Drawing.Unit.internalToPixel($p0[$1].x).toString());
                $0.append(',');
                $0.append(PerfectWidgets.Framework.Drawing.Unit.internalToPixel($p0[$1].y).toString());
                $0.append(' ');
            }
            return $0.toString();
        },
        $9: function($p0, $p1) {
            if ($p1 == null || $p1.getWidth() === 0) {
                return;
            }
            $p0['stroke'] = PerfectWidgets.Framework.Drawing.ColorTranslator.toSvg($p1.getColor());
            $p0['stroke-opacity'] = this.$18($p1.getColor());
            $p0['stroke-width'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($p1.getWidth()).toString();
            $p0['stroke-dasharray'] = this.$A($p1);
            $p0['stroke-linecap'] = 'butt';
        },
        $A: function($p0) {
            switch ($p0.getStyle()) {
                case PerfectWidgets.Framework.Drawing.LineStyle.none:
                    return '0, 1';
                case PerfectWidgets.Framework.Drawing.LineStyle.solid:
                    return '1, 0';
                case PerfectWidgets.Framework.Drawing.LineStyle.dash:
                    return $p0.getDashLength() + ', ' + $p0.getSpaceLenght();
                case PerfectWidgets.Framework.Drawing.LineStyle.dashDot:
                    return $p0.getDashLength() + ', ' + $p0.getSpaceLenght() + ', ' + $p0.getDotLength() + ', ' + $p0.getSpaceLenght();
                case PerfectWidgets.Framework.Drawing.LineStyle.dashDotDot:
                    return $p0.getDashLength() + ', ' + $p0.getSpaceLenght() + ', ' + $p0.getDotLength() + ', ' + $p0.getSpaceLenght() + ', ' + $p0.getDotLength() + ', ' + $p0.getSpaceLenght();
                case PerfectWidgets.Framework.Drawing.LineStyle.dot:
                    return $p0.getDotLength() + ', ' + $p0.getSpaceLenght();
                default:
                    throw new Error('Unknow DashStyle');
            }
        },
        $B: function($p0) {
            var $0 = document.getElementById($p0);
            if ($0 != null) {
                while ($0.hasChildNodes()) {
                    $0.removeChild($0.lastChild);
                }
                this.$7.removeChild($0);
            }
        },
        $C: function($p0, $p1, $p2, $p3) {
            if ($p1 == null || Type.canCast($p1, PerfectWidgets.Framework.Drawing.EmptyFill)) {
                $p0['fill'] = 'none';
                return;
            } else if (Type.canCast($p1, PerfectWidgets.Framework.Drawing.SolidFill)) {
                var $0 = ($p1).color;
                $p0['fill-opacity'] = this.$18($0);
                $p0['fill'] = PerfectWidgets.Framework.Drawing.ColorTranslator.toSvg($0);
                return;
            } else if (Type.canCast($p1, PerfectWidgets.Framework.Drawing.LinearGradientFill)) {
                this.$B($p3);
                this.$11($p0, $p1, $p2, $p3);
                return;
            } else if (Type.canCast($p1, PerfectWidgets.Framework.Drawing.MultiGradientFill)) {
                this.$B($p3);
                this.$F($p0, $p1, $p2, $p3);
                return;
            } else if (Type.canCast($p1, PerfectWidgets.Framework.Drawing.SphericalFill)) {
                this.$B($p3);
                this.$E($p0, $p1, $p2, $p3);
                return;
            } else {
                var $1 = $p1.getReplaceColor();
                $p0['fill-opacity'] = this.$18($1);
                $p0['fill'] = PerfectWidgets.Framework.Drawing.ColorTranslator.toSvg($1);
                return;
            }
        },
        $D: function($p0) {
            return 'url(#' + $p0 + ')';
        },
        $E: function($p0, $p1, $p2, $p3) {
            var $0 = {};
            $0['id'] = $p3;
            $0['gradientUnits'] = 'userSpaceOnUse';
            var $1 = PerfectWidgets.Framework.Drawing.Fill.getFillRectangle($p2, $p1.getDelta(), $p1.getAngle());
            var $2 = $1.getCenter();
            var $3 = $1.width / 2;
            $0['cx'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($2.x).toString();
            $0['cy'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($2.y).toString();
            $0['fx'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($2.x).toString();
            $0['fy'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($2.y).toString();
            $0['r'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($3).toString();
            var $4 = this.$15('http://www.w3.org/2000/svg', 'radialGradient', $0);
            this.$12($4, 0, $p1.getEndColor());
            this.$12($4, 1, $p1.getStartColor());
            this.$7.appendChild($4);
            $p0['fill'] = this.$D($p3);
        },
        $F: function($p0, $p1, $p2, $p3) {
            var $0 = {};
            $0['id'] = $p3;
            $0['gradientUnits'] = 'userSpaceOnUse';
            var $1 = this.$10($p2, $p1.getAngle() + $p1.getAdditionalAngle());
            var $2 = $p2.getCenter().minus($1.divideByNumber(2));
            var $3 = $p2.getCenter().add($1.divideByNumber(2));
            $0['x1'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($2.x);
            $0['y1'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($2.y);
            $0['x2'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($3.x);
            $0['y2'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($3.y);
            var $4 = this.$15('http://www.w3.org/2000/svg', 'linearGradient', $0);
            var $5 = $p1.getColors();
            for (var $6 = 0; $6 < $5.getCount(); $6++) {
                var $7 = $5.get($6);
                this.$12($4, $7.getPortion(), $7.getColor());
            }
            this.$7.appendChild($4);
            $p0['fill'] = this.$D($p3);
        },
        $10: function($p0, $p1) {
            var $0 = $p0.getCenter();
            var $1 = $0;
            var $2;
            var $3;
            if ($p1 % 360 <= 180) {
                if ($p1 % 180 < 90) {
                    $2 = $p0.getBottomRight();
                } else {
                    $2 = $p0.getBottomLeft();
                }
            } else {
                if ($p1 % 180 <= 90) {
                    $2 = $p0.getTopLeft();
                } else {
                    $2 = $p0.getTopRight();
                }
            }
            var $4 = Math.cos($p1 / 180 * Math.PI);
            var $5 = Math.sin($p1 / 180 * Math.PI);
            var $6 = $0.y * $4 * $4 + $2.y * $5 * $5 + ($2.x - $0.x) * $5 * $4;
            var $7 = ($2.y - $0.y) * $5 * $4 + $0.x * $5 * $5 + $2.x * $4 * $4;
            $3 = new PerfectWidgets.Framework.DataObjects.Vector(($7 - $0.x) * 2, ($6 - $0.y) * 2);
            return $3;
        },
        $11: function($p0, $p1, $p2, $p3) {
            var $0 = {};
            $0['id'] = $p3;
            $0['gradientUnits'] = 'userSpaceOnUse';
            var $1 = this.$10($p2, $p1.getAngle() + $p1.getAdditionalAngle());
            var $2 = $p2.getCenter().minus($1.divideByNumber(2));
            var $3 = $p2.getCenter().add($1.divideByNumber(2));
            $0['x1'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($2.x);
            $0['y1'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($2.y);
            $0['x2'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($3.x);
            $0['y2'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($3.y);
            var $4 = this.$15('http://www.w3.org/2000/svg', 'linearGradient', $0);
            this.$12($4, 0, $p1.getStartColor());
            this.$12($4, 1, $p1.getEndColor());
            this.$7.appendChild($4);
            $p0['fill'] = this.$D($p3);
        },
        $12: function($p0, $p1, $p2) {
            var $0 = {};
            $0['offset'] = $p1.toString();
            $0['stop-color'] = PerfectWidgets.Framework.Drawing.ColorTranslator.toSvg($p2);
            $0['stop-opacity'] = $p2.a() / 255;
            var $1 = this.$15('http://www.w3.org/2000/svg', 'stop', $0);
            $p0.appendChild($1);
        },
        $13: function($p0, $p1, $p2, $p3, $p4, $p5) {
            var $0 = new ss.StringBuilder('M ');
            this.$14($0, $p0);
            $0.append('A ');
            this.$14($0, $p2);
            $0.append($p3.toString());
            $0.append(' ');
            $0.append($p4.toString());
            $0.append(' ');
            $0.append($p5.toString());
            $0.append(' ');
            this.$14($0, $p1);
            return $0;
        },
        $14: function($p0, $p1) {
            if ($p0 == null) {
                return;
            }
            $p0.append(PerfectWidgets.Framework.Drawing.Unit.internalToPixel($p1.x).toString());
            $p0.append(' ');
            $p0.append(PerfectWidgets.Framework.Drawing.Unit.internalToPixel($p1.y).toString());
            $p0.append(' ');
        },
        $15: function($p0, $p1, $p2) {
            var $0 = document.createElementNS($p0, $p1);
            if ($p2 != null && Object.getKeyCount($p2) > 0) {
                var $enum1 = ss.IEnumerator.getEnumerator(Object.keys($p2));
                while ($enum1.moveNext()) {
                    var $1 = $enum1.current;
                    if ($1.startsWith('@')) {
                        var $2 = $1.lastIndexOf(':');
                        var $3 = $1.substr(1, $2 - 1);
                        var $4 = $1.substr($2 + 1);
                        $0.setAttributeNS($3, $4, $p2[$1]);
                    } else {
                        $0.setAttribute($1, $p2[$1]);
                    }
                }
            }
            return $0;
        },
        $16: function($p0, $p1) {
            if ($p1 != null && Object.getKeyCount($p1) > 0) {
                var $enum1 = ss.IEnumerator.getEnumerator(Object.keys($p1));
                while ($enum1.moveNext()) {
                    var $0 = $enum1.current;
                    if ($0.startsWith('@')) {
                        var $1 = $0.lastIndexOf(':');
                        var $2 = $0.substr(1, $1 - 1);
                        var $3 = $0.substr($1 + 1);
                        $p0.setAttributeNS($2, $3, $p1[$0]);
                    } else {
                        $p0.setAttribute($0, $p1[$0]);
                    }
                }
            }
        },
        $17: function($p0, $p1) {
            if ($p1 != null) {
                var $0 = '';
                if (Type.canCast($p1, PerfectWidgets.Framework.Transformation.TranslateTransformation)) {
                    var $1 = PerfectWidgets.Framework.Drawing.Unit.vectorToPixel(($p1).getTranslation());
                    $0 = 'translate(' + $1.x + ', ' + $1.y + ')';
                } else if (Type.canCast($p1, PerfectWidgets.Framework.Transformation.ScaleTransformation)) {
                    var $2 = ($p1).getScale();
                    $0 = 'scale(' + $2.x + ', ' + $2.y + ')';
                } else if (Type.canCast($p1, PerfectWidgets.Framework.Transformation.RotateTransformation)) {
                    var $3 = $p1;
                    var $4 = $3.getAngle();
                    var $5 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($3.getCenter().x);
                    var $6 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel($3.getCenter().y);
                    $0 = 'rotate(' + $4 + ', ' + $5 + ', ' + $6 + ')';
                } else if (Type.canCast($p1, PerfectWidgets.Framework.Transformation.MatrixTransformation)) {
                    var $7 = ($p1).getTransformationMatrix();
                    $0 = 'matrix(' + $7.get(0, 0) + ' ' + $7.get(1, 0) + ' ' + $7.get(0, 1) + ' ' + $7.get(1, 1) + ' ' + PerfectWidgets.Framework.Drawing.Unit.internalToPixel($7.get(0, 2)) + ' ' + PerfectWidgets.Framework.Drawing.Unit.internalToPixel($7.get(1, 2)) + ')';
                }
                $p0.setAttribute('transform', $0);
            }
        },
        createSvg: function(size, viewBox) {
            var $0 = {};
            if (!size.isEmpty()) {
                if (size.x <= 0 || size.y <= 0) {
                    throw new Error('ExceptionBuilder.ArgumentVectorHasNegativeOrZeroCoordinate("size")');
                }
            }
            $0['width'] = size.x.toString();
            $0['height'] = size.y.toString();
            $0['id'] = this.$0 + '_svg';
            if (!viewBox.isEmpty()) {
                var $1 = new ss.StringBuilder(viewBox.getLeft().toString());
                $1.append(' ');
                $1.append(viewBox.getTop().toString());
                $1.append(' ');
                $1.append(viewBox.width.toString());
                $1.append(' ');
                $1.append(viewBox.height.toString());
                $0['viewBox'] = $1.toString();
            }
            $0['version'] = '1.1';
            $0['xmlns'] = 'http://www.w3.org/2000/svg';
            this.$7 = this.$1D();
            this.$6 = this.$15('http://www.w3.org/2000/svg', 'svg', $0);
            this.$6.appendChild(this.$7);
            document.getElementById(this.$0).appendChild(this.$6);
            return this.$6;
        },
        getCurrentGroup: function(groupId) {
            return document.getElementById(groupId);
        },
        startGroup: function(groupId, parent, transformation, isVisible) {
            var $0 = null;
            var $1 = false;
            var $2 = {};
            $0 = document.getElementById(groupId);
            $1 = $0 != null;
            if (!$1) {
                $2['id'] = groupId;
                $0 = this.$15('http://www.w3.org/2000/svg', 'g', $2);
                parent.appendChild($0);
            }
            if (!isVisible) {
                $0.setAttribute('visibility', 'hidden');
            } else {
                $0.setAttribute('visibility', 'visible');
            }
            this.$17($0, transformation);
            return $0;
        },
        writePolyline: function(points, stroke, guid, classNames) {
            var $0 = document.getElementById(guid);
            var $1 = {};
            this.$9($1, stroke);
            $1['points'] = this.$8(points);
            $1['id'] = guid;
            if (classNames != null) {
                $1['class'] = classNames.join(' ');
            }
            if ($0 != null) {
                this.$16($0, $1);
                return null;
            } else {
                return this.$15('http://www.w3.org/2000/svg', 'polyline', $1);
            }
        },
        writePolygon: function(points, fill, stroke, guid, classNames) {
            var $0 = document.getElementById(guid);
            var $1 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getPolygonBox(points);
            var $2 = {};
            this.$C($2, fill, $1, guid + '_fill');
            this.$9($2, stroke);
            $2['points'] = this.$8(points);
            $2['id'] = guid;
            if (classNames != null) {
                $2['class'] = classNames.join(' ');
            }
            if ($0 != null) {
                this.$16($0, $2);
                return null;
            } else {
                return this.$15('http://www.w3.org/2000/svg', 'polygon', $2);
            }
        },
        $18: function($p0) {
            if ($p0.isKnownColor() && $p0.toKnownColor() !== PerfectWidgets.Framework.Drawing.KnownColor.transparent) {
                return 1;
            }
            return $p0.a() / 255;
        },
        writeRect: function(vr, angle, fill, stroke, guid, classNames) {
            var $0 = document.getElementById(guid);
            var $1 = {};
            this.$C($1, fill, vr, guid + '_fill');
            this.$9($1, stroke);
            var $2 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(vr.x);
            var $3 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(vr.y);
            var $4 = Math.abs(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(vr.width));
            var $5 = Math.abs(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(vr.height));
            var $6 = new ss.StringBuilder('rotate(');
            $6.append(angle.toString());
            $6.append(' ');
            $6.append($2 + $4 / 2);
            $6.append(' ');
            $6.append($3 + $5 / 2);
            $6.append(')');
            $1['transform'] = $6.toString();
            $1['x'] = $2.toString();
            $1['y'] = $3.toString();
            $1['width'] = $4.toString();
            $1['height'] = $5.toString();
            $1['id'] = guid;
            if (classNames != null) {
                $1['class'] = classNames.join(' ');
            }
            if ($0 != null) {
                this.$16($0, $1);
                return null;
            } else {
                return this.$15('http://www.w3.org/2000/svg', 'rect', $1);
            }
        },
        writeRoundedRect: function(vr, rx, ry, fill, stroke, guid, classNames) {
            var $0 = document.getElementById(guid);
            var $1 = {};
            this.$C($1, fill, vr, guid + '_fill');
            this.$9($1, stroke);
            var $2 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(vr.x);
            var $3 = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(vr.y);
            var $4 = Math.abs(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(vr.width));
            var $5 = Math.abs(PerfectWidgets.Framework.Drawing.Unit.internalToPixel(vr.height));
            $1['x'] = $2.toString();
            $1['y'] = $3.toString();
            $1['width'] = $4.toString();
            $1['height'] = $5.toString();
            $1['id'] = guid;
            $1['rx'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(rx).toString();
            $1['ry'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(ry).toString();
            if (classNames != null) {
                $1['class'] = classNames.join(' ');
            }
            if ($0 != null) {
                this.$16($0, $1);
                return null;
            } else {
                return this.$15('http://www.w3.org/2000/svg', 'rect', $1);
            }
        },
        writeArc: function(p1, p2, radii, rotate, large, sweep, stroke, guid, classNames) {
            var $0 = document.getElementById(guid);
            var $1 = {};
            this.$9($1, stroke);
            $1['d'] = this.$13(p1, p2, radii, rotate, large, sweep).toString();
            $1['id'] = guid;
            if (classNames != null) {
                $1['class'] = classNames.join(' ');
            }
            if ($0 != null) {
                this.$16($0, $1);
                return null;
            } else {
                return this.$15('http://www.w3.org/2000/svg', 'path', $1);
            }
        },
        writeCircle: function(center, radius, fill, stroke, guid, classNames) {
            var $0 = document.getElementById(guid);
            var $1 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(center.x - radius, center.y - radius, 2 * radius, 2 * radius);
            var $2 = {};
            this.$C($2, fill, $1, guid + '_fill');
            this.$9($2, stroke);
            $2['cx'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(center.x).toString();
            $2['cy'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(center.y).toString();
            $2['r'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(radius).toString();
            $2['id'] = guid;
            if (classNames != null) {
                $2['class'] = classNames.join(' ');
            }
            if ($0 != null) {
                this.$16($0, $2);
                return null;
            } else {
                return this.$15('http://www.w3.org/2000/svg', 'circle', $2);
            }
        },
        writeEllipse: function(center, radii, rotate, fill, stroke, guid, classNames) {
            var $0 = document.getElementById(guid);
            var $1 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(center.x - radii.x, center.y - radii.y, radii.x * 2, radii.y * 2);
            var $2 = {};
            this.$C($2, fill, $1, guid + '_fill');
            var $3 = new ss.StringBuilder('rotate(');
            $3.append(rotate.toString());
            $3.append(')');
            this.$9($2, stroke);
            $2['transform'] = $3.toString();
            $2['cx'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(center.x).toString();
            $2['cy'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(center.y).toString();
            $2['rx'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(radii.x).toString();
            $2['ry'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(radii.y).toString();
            $2['id'] = guid;
            if (classNames != null) {
                $2['class'] = classNames.join(' ');
            }
            if ($0 != null) {
                this.$16($0, $2);
                return null;
            } else {
                return this.$15('http://www.w3.org/2000/svg', 'ellipse', $2);
            }
        },
        writePie: function(p1, p2, radii, rotate, large, sweep, center, fill, stroke, guid, classNames) {
            var $0 = document.getElementById(guid);
            var $1 = {};
            this.$C($1, fill, PerfectWidgets.Framework.DataObjects.VectorRectangle.empty, guid + '_fill');
            var $2 = this.$13(p1, p2, radii, rotate, large, sweep);
            $2.append(' L ');
            this.$14($2, center);
            $2.append('Z');
            this.$9($1, stroke);
            $1['d'] = $2.toString();
            $1['id'] = guid;
            if (classNames != null) {
                $1['class'] = classNames.join(' ');
            }
            if ($0 != null) {
                this.$16($0, $1);
                return null;
            } else {
                return this.$15('http://www.w3.org/2000/svg', 'path', $1);
            }
        },
        writeGraphicsPath: function(path, fill, stroke, guid, classNames) {
            var $0 = document.getElementById(guid);
            var $1 = {};
            this.$C($1, fill, path.getBounds(), guid + '_fill');
            this.$9($1, stroke);
            $1['id'] = guid;
            $1['d'] = path.toString();
            if (classNames != null) {
                $1['class'] = classNames.join(' ');
            }
            if ($0 == null) {
                return this.$15('http://www.w3.org/2000/svg', 'path', $1);
            } else {
                this.$16($0, $1);
                return null;
            }
        },
        setSmoothMode: function(smooth) {
            var $0 = {};
            if (smooth) {
                $0['color-interpolation'] = 'sRGB';
                $0['color-interpolation-filters'] = 'sRGB';
                $0['color-rendering'] = 'optimizeQuality';
                $0['shape-rendering'] = 'geometricPrecision';
                $0['text-rendering'] = 'geometricPrecision';
                $0['image-rendering'] = 'optimizeQuality';
            } else {
                $0['color-interpolation'] = 'linearRGB';
                $0['color-interpolation-filters'] = 'linearRGB';
                $0['color-rendering'] = 'optimizeSpeed';
                $0['shape-rendering'] = 'optimizeSpeed';
                $0['text-rendering'] = 'optimizeSpeed';
                $0['image-rendering'] = 'optimizeSpeed';
            }
            return this.$15('http://www.w3.org/2000/svg', 'g', $0);
        },
        createTransformationGroup: function(m) {
            if (m == null) {
                return null;
            }
            var $0 = {};
            var $1 = new ss.StringBuilder();
            $1.append('matrix(');
            $1.append(m.get(0, 0));
            $1.append(' ');
            $1.append(m.get(1, 0));
            $1.append(' ');
            $1.append(m.get(0, 1));
            $1.append(' ');
            $1.append(m.get(1, 1));
            $1.append(' ');
            $1.append(m.get(0, 2));
            $1.append(' ');
            $1.append(m.get(1, 2));
            $1.append(')');
            $0['transform'] = $1.toString();
            return this.$15('http://www.w3.org/2000/svg', 'g', $0);
        },
        writeImage: function(image, position, size, guid, classNames) {
            var $0 = document.getElementById(guid);
            if (image == null) {
                return null;
            }
            var $1 = {};
            if (!position.isEmpty()) {
                $1['x'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(position.x).toString();
                $1['y'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(position.y).toString();
            }
            if (!size.isEmpty()) {
                $1['width'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(size.x).toString();
                $1['height'] = PerfectWidgets.Framework.Drawing.Unit.internalToPixel(size.y).toString();
            }
            $1['id'] = guid;
            $1['@http://www.w3.org/1999/xlink:href'] = image.getImageStream();
            if (classNames != null) {
                $1['class'] = classNames.join(' ');
            }
            $1['preserveAspectRatio'] = 'none';
            if ($0 != null) {
                this.$16($0, $1);
                return null;
            } else {
                return this.$15('http://www.w3.org/2000/svg', 'image', $1);
            }
        },
        writeText: function(text, position, rotate, font, fill, alignment, guid, classNames) {
            var $0 = document.getElementById(guid);
            if (font == null) {
                return null;
            }
            var $1 = PerfectWidgets.Framework.Utilities.TextUtilities.insertMockDiv(font);
            var $2 = PerfectWidgets.Framework.Utilities.TextUtilities.measureText(text, font, $1);
            PerfectWidgets.Framework.Utilities.TextUtilities.deleteMockDiv($1);
            var $3 = {};
            var $4 = new PerfectWidgets.Framework.DataObjects.VectorRectangle(position.x, position.y, $2.x, $2.y);
            this.$C($3, fill, $4, guid + '_fill');
            var $5 = new ss.StringBuilder('translate(');
            this.$14($5, position);
            $5.append(') rotate(');
            $5.append(rotate.toString());
            $5.append(')');
            $3['transform'] = $5.toString();
            $3['font-family'] = font.fontFamily.name;
            $3['font-size'] = font.sizeInPoints.toString() + 'pt';
            if (font.style === PerfectWidgets.Framework.Drawing.FontStyle.italic) {
                $3['font-style'] = 'italic';
            }
            if (font.style === PerfectWidgets.Framework.Drawing.FontStyle.bold) {
                $3['font-weight'] = 'bold';
            }
            if (font.style === PerfectWidgets.Framework.Drawing.FontStyle.underline) {
                $3['text-decoration'] = 'underline';
            } else if (font.style === PerfectWidgets.Framework.Drawing.FontStyle.strikeout) {
                $3['text-decoration'] = 'line-through';
            }
            switch (alignment) {
                case PerfectWidgets.Model.BaseElements.StringAlignment.center:
                    $3['text-anchor'] = 'middle';
                    break;
                case PerfectWidgets.Model.BaseElements.StringAlignment.near:
                    $3['text-anchor'] = 'start';
                    break;
                case PerfectWidgets.Model.BaseElements.StringAlignment.far:
                    $3['text-anchor'] = 'end';
                    break;
            }
            $3['dy'] = PerfectWidgets.Drawing.SvgBuilder.$3 + 'em';
            $3['id'] = guid;
            if (classNames != null) {
                $3['class'] = classNames.join(' ');
            }
            if ($0 != null) {
                this.$16($0, $3);
                $0.textContent = text;
                return null;
            } else {
                $0 = this.$15('http://www.w3.org/2000/svg', 'text', $3);
                $0.textContent = text;
                return $0;
            }
        },
        writeAlignedText: function(text, box, rotate, font, fill, alignment, guid, classNames) {
            var $0 = [];
            var $1 = document.getElementById(guid);
            this.$1C(guid);
            var $2 = PerfectWidgets.Framework.Utilities.TextUtilities.wordWrapText(text, PerfectWidgets.Framework.Drawing.Unit.internalToPixel(box.width), font);
            if (font == null) {
                return null;
            }
            for (var $3 = 0; $3 < $2.length; $3++) {
                var $4 = {};
                this.$C($4, fill, box, guid + '_fill');
                var $5 = false;
                if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, PerfectWidgets.Framework.Drawing.FontStyle.italic)) {
                    $4['font-style'] = 'italic';
                    $5 = true;
                }
                if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, PerfectWidgets.Framework.Drawing.FontStyle.bold)) {
                    $4['font-weight'] = 'bold';
                }
                if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, PerfectWidgets.Framework.Drawing.FontStyle.underline)) {
                    $4['text-decoration'] = 'underline';
                } else {
                    if (PerfectWidgets.Framework.Utilities.TextUtilities.stylesAreCrossing(font.style, PerfectWidgets.Framework.Drawing.FontStyle.strikeout)) {
                        $4['text-decoration'] = 'line-through';
                    }
                }
                var $6 = this.$19(box, alignment, $4, $3, $2.length, $5);
                var $7 = new ss.StringBuilder('translate(');
                this.$14($7, $6);
                $7.append(') rotate(');
                $7.append(rotate.toString());
                $7.append(')');
                $4['transform'] = $7.toString();
                $4['font-family'] = font.fontFamily.name;
                $4['font-size'] = font.sizeInPoints.toString() + 'pt';
                $4['id'] = ($2.length === 1) ? guid : guid + $3.toString();
                if (classNames != null) {
                    $4['class'] = classNames.join(' ');
                }
                if ($2.length === 1) {
                    if ($1 != null) {
                        this.$16($1, $4);
                        $1.textContent = text;
                        return null;
                    } else {
                        $1 = this.$15('http://www.w3.org/2000/svg', 'text', $4);
                        $1.textContent = text;
                        $0.add($1);
                        return $0;
                    }
                } else {
                    $1 = this.$15('http://www.w3.org/2000/svg', 'text', $4);
                    $1.textContent = $2[$3];
                }
                $0.add($1);
            }
            return $0;
        },
        $19: function($p0, $p1, $p2, $p3, $p4, $p5) {
            var $0 = 0;
            var $1 = 0;
            var $2 = 0;
            var $3 = 0;
            switch ($p1) {
                case PerfectWidgets.Framework.Drawing.ContentAlignment.bottomCenter:
                    $0 = $p0.width / 2;
                    $1 = $p0.height;
                    $p2['text-anchor'] = 'middle';
                    if ($p5) {
                        $3 = -0.25 / 2;
                    }
                    $2 = -0.25 - ($p4 - 1 - $p3);
                    break;
                case PerfectWidgets.Framework.Drawing.ContentAlignment.middleCenter:
                    $0 = $p0.width / 2;
                    $1 = $p0.height / 2;
                    if ($p5) {
                        $3 = -0.25 / 2;
                    }
                    $2 = 0.25 - Math.floor($p4 / 2) + ($p4 + 1) % 2 * 0.5 + $p3;
                    $p2['text-anchor'] = 'middle';
                    break;
                case PerfectWidgets.Framework.Drawing.ContentAlignment.topCenter:
                    $0 = $p0.width / 2;
                    $1 = $p3;
                    $p2['text-anchor'] = 'middle';
                    if ($p5) {
                        $3 = -0.25 / 2;
                    }
                    $2 = 0.75 + $p3;
                    break;
                case PerfectWidgets.Framework.Drawing.ContentAlignment.bottomLeft:
                    $0 = 0;
                    $1 = $p0.height;
                    $2 = -0.25 - ($p4 - 1 - $p3);
                    $p2['text-anchor'] = 'start';
                    break;
                case PerfectWidgets.Framework.Drawing.ContentAlignment.middleLeft:
                    $0 = 0;
                    $1 = $p0.height / 2;
                    $2 = 0.25 - Math.floor($p4 / 2) + ($p4 + 1) % 2 * 0.5 + $p3;
                    $p2['text-anchor'] = 'start';
                    break;
                case PerfectWidgets.Framework.Drawing.ContentAlignment.topLeft:
                    $0 = 0;
                    $1 = 0;
                    $2 = 0.75 + $p3;
                    $p2['text-anchor'] = 'start';
                    break;
                case PerfectWidgets.Framework.Drawing.ContentAlignment.bottomRight:
                    $0 = $p0.width;
                    $1 = $p0.height;
                    $2 = -0.25 - ($p4 - 1 - $p3);
                    if ($p5) {
                        $3 = -0.25;
                    }
                    $p2['text-anchor'] = 'end';
                    break;
                case PerfectWidgets.Framework.Drawing.ContentAlignment.middleRight:
                    $0 = $p0.width;
                    $1 = $p0.height / 2;
                    if ($p5) {
                        $3 = -0.25;
                    }
                    $2 = 0.25 - Math.floor($p4 / 2) + ($p4 + 1) % 2 * 0.5 + $p3;
                    $p2['text-anchor'] = 'end';
                    break;
                case PerfectWidgets.Framework.Drawing.ContentAlignment.topRight:
                    $0 = $p0.width;
                    $1 = 0;
                    $2 = 0.75 + $p3;
                    if ($p5) {
                        $3 = -0.25;
                    }
                    $p2['text-anchor'] = 'end';
                    break;
            }
            this.$1A($p2, $3);
            this.$1B($p2, $2);
            var $4 = new PerfectWidgets.Framework.DataObjects.Vector($p0.getLeft() + $0, $p0.getTop() + $1);
            return $4;
        },
        $1A: function($p0, $p1) {
            $p0['dx'] = String.format('{0}em', $p1);
        },
        $1B: function($p0, $p1) {
            $p0['dy'] = String.format('{0}em', $p1);
        },
        $1C: function($p0) {
            var $0 = 0;
            var $1 = document.getElementById($p0 + $0.toString());
            while ($1 != null) {
                var $2 = $1.parentNode;
                $2.removeChild($1);
                $0++;
                $1 = document.getElementById($p0 + $0.toString());
            }
            return $0;
        },
        $1D: function() {
            var $0 = {};
            $0['id'] = PerfectWidgets.Framework.Utilities.Guid.newGuid();
            return this.$15('http://www.w3.org/2000/svg', 'defs', $0);
        },
        reset: function() {
            while (this.$6.hasChildNodes()) {
                this.$6.removeChild(this.$6.lastChild);
            }
        },
        clip: function(rect, parent, guid, isVisible) {
            var $0 = null;
            var $1 = false;
            var $2 = {};
            $0 = document.getElementById(guid + '_Clip');
            $1 = $0 != null;
            if (!$1) {
                $2['id'] = guid + '_Clip';
                $2['clip-path'] = this.$1E(rect, guid);
                $0 = this.$15('http://www.w3.org/2000/svg', 'g', $2);
                parent.appendChild($0);
            } else {
                this.$1E(rect, guid);
                this.$16($0, $2);
            }
            if (!isVisible) {
                $0.setAttribute('visibility', 'hidden');
            } else {
                $0.setAttribute('visibility', 'visible');
            }
            return $0;
        },
        $1E: function($p0, $p1) {
            var $0 = document.getElementById($p1 + '_clipPath');
            var $1 = {};
            if ($0 == null) {
                $1['id'] = $p1 + '_clipPath';
                $0 = this.$15('http://www.w3.org/2000/svg', 'clipPath', $1);
                $0.appendChild(this.$20($p0));
                this.$7.appendChild($0);
            } else {
                PerfectWidgets.Drawing.SvgBuilder.$1F($0);
                $0.appendChild(this.$20($p0));
            }
            return this.$D($p1 + '_clipPath');
        },
        $20: function($p0) {
            var $0 = PerfectWidgets.Framework.Drawing.Unit.rectToPixel($p0);
            var $1 = {};
            $1['x'] = $0.x.toString();
            $1['y'] = $0.y.toString();
            $1['width'] = $0.width.toString();
            $1['height'] = $0.height.toString();
            var $2 = this.$15('http://www.w3.org/2000/svg', 'rect', $1);
            return $2;
        }
    }
    PerfectWidgets.Drawing.SvgPainter = function(id, size, viewBox) {
        this.$0 = new PerfectWidgets.Drawing.SvgBuilder(id);
        this.$4(this.$0.createSvg(size, viewBox));
    }
    PerfectWidgets.Drawing.SvgPainter.prototype = {
        $0: null,
        $1: null,
        $2: null,
        $3: function($p0) {
            if (this.$1 == null) {
                this.$1 = [];
            }
            if (this.$1.length > 0 && $p0 != null) {
                this.$1.peek().appendChild($p0);
            }
        },
        $4: function($p0) {
            if (this.$1 == null) {
                this.$1 = [];
            }
            this.$1.push($p0);
        },
        $5: function() {
            if (this.$1 != null) {
                return this.$1.pop();
            }
            return null;
        },
        drawPolygon: function(fill, stroke, points) {
            var $0 = this.$0.writePolygon(points, fill, stroke, this.$6(), this.$7());
            this.$3($0);
        },
        drawRectangle: function(fill, stroke, vr, angle) {
            var $0 = this.$0.writeRect(vr, angle, fill, stroke, this.$6(), this.$7());
            this.$3($0);
        },
        drawRoundedRectangle: function(fill, stroke, vr, rx, ry) {
            var $0 = this.$0.writeRoundedRect(vr, rx, ry, fill, stroke, this.$6(), this.$7());
            this.$3($0);
        },
        drawArc: function(fill, stroke, vr, startAngle, sweepAngle) {
            var $0 = new PerfectWidgets.Framework.DataObjects.Vector(vr.width / 2, vr.height / 2);
            var $1 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint(vr.getCenter(), $0, startAngle);
            var $2 = PerfectWidgets.Framework.Geometry.GeometryUtilities.getEllipsePoint(vr.getCenter(), $0, startAngle + sweepAngle);
            var $3 = this.$0.writeArc($1, $2, $0, 0, (sweepAngle % 360 > 180) ? true : false, (sweepAngle > 0) ? true : false, stroke, this.$6(), this.$7());
            this.$3($3);
        },
        drawCircle: function(fill, stroke, center, radius) {
            var $0 = this.$0.writeCircle(new PerfectWidgets.Framework.DataObjects.Vector(center.x, center.y), radius, fill, stroke, this.$6(), this.$7());
            this.$3($0);
        },
        drawEllipse: function(fill, stroke, vr) {
            var $0 = new PerfectWidgets.Framework.DataObjects.Vector(vr.width / 2, vr.height / 2);
            var $1 = this.$0.writeEllipse(vr.getCenter(), $0, 0, fill, stroke, this.$6(), this.$7());
            this.$3($1);
        },
        drawGraphicsPath: function(fill, stroke, path) {
            var $0 = this.$0.writeGraphicsPath(path, fill, stroke, this.$6(), this.$7());
            this.$3($0);
        },
        drawLine: function(stroke, points) {
            var $0 = this.$0.writePolyline(points, stroke, this.$6(), this.$7());
            this.$3($0);
        },
        drawImage: function(image, destRect) {
            var $0 = this.$0.writeImage(image, new PerfectWidgets.Framework.DataObjects.Vector(destRect.x, destRect.y), new PerfectWidgets.Framework.DataObjects.Vector(destRect.width, destRect.height), this.$6(), this.$7());
            if ($0 != null) {
                this.$3($0);
            }
        },
        drawText: function(text, font, fill, position, angle, alignment) {
            var $0 = this.$0.writeText(text, position, angle, font, fill, alignment, this.$6(), this.$7());
            this.$3($0);
        },
        drawAlignedText: function(text, font, fill, box, angle, alignment) {
            var $0 = this.$0.writeAlignedText(text, box, angle, font, fill, alignment, this.$6(), this.$7());
            if ($0 == null) {
                return;
            }
            for (var $1 = 0; $1 < $0.length; $1++) {
                this.$3($0[$1]);
            }
        },
        createGroup: function() {
            var $0 = this.$6() + '_group';
            var $1 = this.$0.startGroup($0, this.$1.peek(), this.$8(), this.$2.getVisible());
            this.$4($1);
        },
        endGroup: function() {
            this.$5();
        },
        startClip: function(clipArea) {
            var $0 = this.$0.clip(clipArea, this.$1.peek(), this.$6(), this.$2.getVisible());
            this.$4($0);
        },
        endClip: function() {
            this.endGroup();
        },
        startTransformation: function(m) {
            var $0 = this.$0.startGroup(this.$6() + '_TransformGroup', this.$1.peek(), new PerfectWidgets.Framework.Transformation.MatrixTransformation(m), this.$2.getVisible());
            this.$4($0);
        },
        endTransformation: function() {
            this.endGroup();
        },
        reset: function() {
            while (this.$1 != null && this.$1.length !== 1) {
                this.$1.pop();
            }
            this.$0.reset();
        },
        setSmoothMode: function(smooth) {
            var $0 = this.$0.setSmoothMode(smooth);
            this.$3($0);
            this.$4($0);
        },
        setContext: function(context) {
            this.$2 = context;
        },
        $6: function() {
            if (this.$2 != null) {
                return this.$2.getName() + '_' + this.$2.getGuid() + this.$2.getSuffix();
            } else {
                return '';
            }
        },
        $7: function() {
            if (this.$2 != null) {
                var $0 = [];
                $0.add(this.$2.getFullName());
                var $1 = this.$2.getClassName();
                if ($1 != null || !!$1) {
                    $0.add(this.$2.getInstrument().getUniqueClassName() + '_' + $1);
                    $0.add($1);
                }
                return $0;
            } else {
                return null;
            }
        },
        $8: function() {
            if (this.$2 != null) {
                return this.$2.getTransformation();
            } else {
                return null;
            }
        },
        clearGroup: function() {
            var $0 = this.$1.peek();
            while ($0.firstChild != null) {
                $0.removeChild($0.firstChild);
            }
        }
    }
    Type.registerNamespace('PerfectWidgets.Model.View');
    PerfectWidgets.Model.View.PickTool = function() {
        PerfectWidgets.Model.View.PickTool.initializeBase(this);
    }
    PerfectWidgets.Model.View.PickTool.prototype = {
        $1_0: false,
        $1_1: null,
        $1_2: null,
        onPointerOut: function(args) {},
        onPointerOver: function(args) {},
        onManipulationStarted: function(args) {
            this.$1_0 = true;
            this.$1_1 = args;
            this.$1_2 = this.$1_3(args);
            if (this.$1_2 != null) {
                var $0 = Type.safeCast(this.$1_2.getParent(), PerfectWidgets.Model.BaseElements.Slider);
                if ($0 != null) {
                    if ($0.getAnimationState() !== PerfectWidgets.Model.Animation.AnimationState.disabled) {
                        $0.setAnimationState(PerfectWidgets.Model.Animation.AnimationState.dragAndDrop);
                    }
                }
                this.$1_2.doMouseDown(args);
            }
        },
        $1_3: function($p0) {
            if (!$p0.isInDiv()) {
                return null;
            }
            return $p0.view().getElementAt($p0.getManipulationOrigin());
        },
        onManipulationEnded: function(args) {
            this.$1_0 = false;
            this.$1_1 = args;
            if (this.$1_2 != null) {
                this.$1_2.doMouseUp(args);
                var $1 = Type.safeCast(this.$1_2.getParent(), PerfectWidgets.Model.BaseElements.Slider);
                if ($1 != null) {
                    if ($1.getAnimationState() !== PerfectWidgets.Model.Animation.AnimationState.disabled) {
                        $1.setAnimationState(PerfectWidgets.Model.Animation.AnimationState.stoped);
                    }
                }
            }
            var $0 = this.$1_3(args);
            if (this.$1_2 !== $0) {
                if (this.$1_2 != null) {
                    this.$1_2.doMouseLeave(args);
                }
                if ($0 != null) {
                    $0.doMouseEnter(args);
                    $0.doMouseMove(args);
                }
                this.$1_2 = $0;
            }
        },
        onPointerMove: function(args) {
            this.$1_1 = args;
            if (this.$1_2 != null && this.$1_0) {
                this.$1_2.doMouseMove(args);
                this.$1_2.setNeedRepaint(true);
            } else {
                var $0 = this.$1_3(args);
                if (this.$1_2 !== $0) {
                    if (this.$1_2 != null) {
                        this.$1_2.doMouseLeave(args);
                    }
                    if ($0 != null) {
                        $0.doMouseEnter(args);
                    }
                    this.$1_2 = $0;
                }
                if (!ss.isNullOrUndefined(this.$1_2)) {
                    this.$1_2.doMouseMove(args);
                }
            }
        },
        onPointerLeave: function(args) {},
        onPointerEnter: function(args) {}
    }
    Type.registerNamespace('WidgetBehavior');
    WidgetBehavior.MovingDigitalText = function() {}
    WidgetBehavior.MovingDigitalText.prototype = {
        $0: null,
        $1: null,
        iterateChildren: function(parent, result) {
            var $0 = parent.getElements();
            var $1 = $0.count();
            for (var $2 = 0; $2 < $1; $2++) {
                if (Type.canCast($0.get_item($2), PerfectWidgets.Model.BaseElements.DigitalText)) {
                    var $3 = $0.get_item($2);
                    if ($3 != null) {
                        result.add($3);
                    }
                }
                if (Type.canCast($0.get_item($2), PerfectWidgets.Model.BaseElements.Composite)) {
                    var $4 = $0.get_item($2);
                    if ($4 != null) {
                        this.iterateChildren($4, result);
                    }
                }
            }
        },
        getDigitalTextList: function(widget) {
            var $0 = [];
            this.iterateChildren(widget.getView().getElement(), $0);
            return $0;
        },
        init: function(widget) {
            this.$0 = this.getDigitalTextList(widget);
            this.$1 = new Array(this.$0.length);
            for (var $0 = 0; $0 < this.$0.length; $0++) {
                var $1 = this.$0[$0].getText();
            }
            this.start();
        },
        initByDigitalTextList: function(clientDigitalText) {
            this.$0 = clientDigitalText;
            this.start();
        },
        start: function() {
            var $0 = this.$0.length;
            for (var $1 = 0; $1 < $0; $1++) {
                this.$0[$1].setText(this.$0[$1].getText() + ' ');
                this.rollDigit($1);
            }
        },
        rollDigit: function(i) {
            PerfectWidgets.Framework.Utilities.BuiltIn.JS('var instRef = this;\r\n            this._timeoutIds[i] = setTimeout(function () {\r\n\t\t\t\tinstRef.onTimer(instRef,i);\r\n                instRef.rollDigit(i);\r\n            },\r\n\t\t\t1000 \r\n\t\t\t);');
        },
        getDemoText: function(value, i) {
            var $0 = this.$0[i].getText();
            return $0.remove(0, 1) + $0.charAt(0);
        },
        onTimer: function(instRef, i) {
            var $0 = (1 + Math.sin(Date.get_now().getTime() * 0.0001)) / 2;
            instRef.$0[i].setText(this.getDemoText($0, i));
            instRef.$0[i].refreshElement();
        },
        dispose: function() {
            for (var $0 = 0; $0 < this.$1.length; $0++) {
                PerfectWidgets.Framework.Utilities.BuiltIn.JS('clearTimeout(this._timeoutIds[i]);');
            }
        }
    }
    WidgetBehavior.RandoOdometer = function() {}
    WidgetBehavior.RandoOdometer.prototype = {
        $0: null,
        $1: null,
        $2: null,
        iterateChildren: function(parent, result) {
            var $0 = parent.getElements();
            var $1 = $0.count();
            for (var $2 = 0; $2 < $1; $2++) {
                if (Type.canCast($0.get_item($2), PerfectWidgets.Model.BaseElements.Odometer)) {
                    var $3 = $0.get_item($2);
                    if ($3 != null) {
                        result.add($3);
                    }
                }
                if (Type.canCast($0.get_item($2), PerfectWidgets.Model.BaseElements.Composite)) {
                    var $4 = $0.get_item($2);
                    if ($4 != null) {
                        this.iterateChildren($4, result);
                    }
                }
            }
        },
        getOdometersList: function(widget) {
            var $0 = [];
            this.iterateChildren(widget.getView().getElement(), $0);
            return $0;
        },
        init: function(widget) {
            this.$0 = this.getOdometersList(widget);
            this.$1 = new Array(this.$0.length);
            this.$2 = new Array(this.$0.length);
            for (var $0 = 0; $0 < this.$0.length; $0++) {
                var $1 = this.$0[$0].getValue();
                this.$1[$0] = $1;
            }
            this.start();
        },
        initByOdometrList: function(clientOdometers) {
            this.$0 = clientOdometers;
            this.start();
        },
        start: function() {
            var $0 = this.$0.length;
            for (var $1 = 0; $1 < $0; $1++) {
                this.rollOdometer($1);
            }
        },
        rollOdometer: function(i) {
            PerfectWidgets.Framework.Utilities.BuiltIn.JS('\r\n                var instRef = this;\r\n                this._timeoutIds[i] = setTimeout(function () {\r\n\t\t\t\t    instRef.onTimer(instRef,i);\r\n                    instRef.rollOdometer(i);\r\n                },\r\n\t\t\t    100 \r\n\t\t\t    );');
        },
        getDemoValue: function(value, i) {
            var $0 = this.$1[i];
            var $1 = this.$1[i] / 2;
            return ($1 + ($0 - $1) * value);
        },
        onTimer: function(instRef, i) {
            var $0 = (1 + Math.sin(Date.get_now().getTime() * 1E-07)) / 2;
            instRef.$0[i].setValue(this.getDemoValue(Math.random(), i));
            instRef.$0[i].refreshElement();
        },
        dispose: function() {
            for (var $0 = 0; $0 < this.$2.length; $0++) {
                PerfectWidgets.Framework.Utilities.BuiltIn.JS('\r\n                    clearTimeout(this._timeoutIds[i]);\r\n                    ');
            }
        }
    }
    WidgetBehavior.RandoDigits = function() {}
    WidgetBehavior.RandoDigits.prototype = {
        $0: null,
        $1: null,
        $2: null,
        $3: null,
        $4: null,
        $5: null,
        $6: null,
        iterateChildren: function(parent, result) {
            var $0 = parent.getElements();
            var $1 = $0.count();
            for (var $2 = 0; $2 < $1; $2++) {
                if (Type.canCast($0.get_item($2), PerfectWidgets.Model.BaseElements.Digits)) {
                    var $3 = $0.get_item($2);
                    if ($3 != null) {
                        result.add($3);
                    }
                }
                if (Type.canCast($0.get_item($2), PerfectWidgets.Model.BaseElements.Composite)) {
                    var $4 = $0.get_item($2);
                    if ($4 != null) {
                        this.iterateChildren($4, result);
                    }
                }
            }
        },
        getDigitsList: function(widget) {
            var $0 = [];
            this.iterateChildren(widget.getView().getElement(), $0);
            return $0;
        },
        init: function(widget) {
            this.$0 = this.getDigitsList(widget);
            this.$1 = new Array(this.$0.length);
            this.$2 = new Array(this.$0.length);
            this.$4 = new Array(this.$0.length);
            this.$5 = new Array(this.$0.length);
            this.$3 = new Array(this.$0.length);
            this.$6 = new Array(this.$0.length);
            for (var $0 = 0; $0 < this.$0.length; $0++) {
                var $1 = this.$0[$0].getText();
                this.$4[$0] = false;
                this.$5[$0] = false;
                this.$6[$0] = false;
                this.$1[$0] = 0;
                this.$2[$0] = 0;
                var $2 = false;
                for (var $3 = 0; $3 < $1.length; $3++) {
                    var $4 = $1.charAt($3);
                    if ($4 === ':') {
                        if (!this.$5[$0]) {
                            this.$5[$0] = true;
                        } else {
                            this.$6[$0] = true;
                        }
                    } else if ($4 === '.') {
                        if (!$2) {
                            $2 = true;
                        } else {
                            this.$6[$0] = true;
                        }
                    } else {
                        if ($2) {
                            this.$1[$0]++;
                        } else {
                            this.$2[$0]++;
                        }
                    }
                }
            }
            this.start();
        },
        initByDigitsList: function(clientDigits) {
            this.$0 = clientDigits;
            this.start();
        },
        start: function() {
            var $0 = this.$0.length;
            for (var $1 = 0; $1 < $0; $1++) {
                this.rollDigit($1);
            }
        },
        rollDigit: function(i) {
            PerfectWidgets.Framework.Utilities.BuiltIn.JS('var instRef = this;\r\n            this._timeoutIds[i] = setTimeout(function () {\r\n\t\t\t\tinstRef.onTimer(instRef,i);\r\n                instRef.rollDigit(i);\r\n            },\r\n\t\t\t1000 \r\n\t\t\t);');
        },
        getClockText: function(value, i) {
            this.$4[i] = !this.$4[i];
            var $0 = Math.floor((24 * 60) * value % 60).toString();
            if ($0.length < 2) {
                $0 = '0' + $0;
            }
            var $1 = Math.floor(24 * value).toString();
            if ($1.length < 2) {
                $1 = '0' + $1;
            }
            return '' + $1 + ':' + $0;
        },
        getFloatText: function(value, i) {
            var $0 = Math.pow(10, this.$2[i]) - 1;
            var $1 = Math.pow(10, this.$2[i] - 1);
            return ($1 + ($0 - $1) * value).format('F' + this.$1[i]);
        },
        isNumber: function(c) {
            return c === '0' || c === '1' || c === '2' || c === '3' || c === '4' || c === '5' || c === '6' || c === '7' || c === '8' || c === '9';
        },
        getCustomText: function(value, i) {
            var $0 = this.$0[i].getText();
            var $1 = '';
            for (var $2 = 0, $3 = $0.length; $2 < $3; $2++) {
                var $4 = $0.charAt($2);
                if (this.isNumber($4)) {
                    $4 = (Math.random() * 9).toString().charAt(0);
                }
                $1 += $4;
            }
            return $1;
        },
        onTimer: function(instRef, i) {
            var $0 = (1 + Math.sin(Date.get_now().getTime() * 0.0001)) / 2;
            if (this.$6[i]) {
                instRef.$0[i].setText(this.getCustomText($0, i));
            } else if (this.$5[i]) {
                instRef.$0[i].setText(this.getClockText($0, i));
            } else {
                instRef.$0[i].setText(this.getFloatText(Math.random(), i));
            }
            instRef.$0[i].getInstrument().refreshElement();
        },
        dispose: function() {
            for (var $0 = 0; $0 < this.$3.length; $0++) {
                PerfectWidgets.Framework.Utilities.BuiltIn.JS('clearTimeout(this._timeoutIds[i]);');
            }
        }
    }
    Type.registerNamespace('PerfectWidgets.Model.Serialization');
    PerfectWidgets.Model.Serialization.CssClass = function() {};
    PerfectWidgets.Model.Serialization.CssClass.prototype = {
        none: 0,
        background: 1,
        foreground: 2,
        arrow: 3,
        ticks: 4,
        labels: 5
    }
    PerfectWidgets.Model.Serialization.CssClass.registerEnum('PerfectWidgets.Model.Serialization.CssClass', false);
    PerfectWidgets.Model.Serialization.JSONParser = function() {}
    PerfectWidgets.Model.Serialization.JSONParser.prototype = {
        $0: null,
        parse: function(jsonModel, jsonParam) {
            this.$0 = [];
            var $0 = this.$6(jsonModel);
            if (jsonParam != null) {
                this.$1($0, jsonParam);
            }
            var $1 = new PerfectWidgets.Model.BaseElements.ToolTipElement();
            $0.setToolTipElement($1);
            $0.getElements().add($1, $0);
            return $0;
        },
        $1: function($p0, $p1) {
            var $0 = Type.safeCast(Type.getInstanceType($p1).getOwnPropertyNames($p1), Array);
            var $enum1 = ss.IEnumerator.getEnumerator($0);
            while ($enum1.moveNext()) {
                var $1 = $enum1.current;
                var $2 = $1.indexOf('.');
                if ($2 !== -1) {
                    var $3 = $1.substr(0, $2);
                    var $4 = $1.substr($2 + 1);
                    var $5 = $p1[$1].toString();
                    var $6 = $p0.getByName($3);
                    if ((typeof($6['set' + $4]) === 'function') && (typeof($6['get' + $4]) === 'function')) {
                        var $7 = $6['get' + $4]();
                        if (Type.canCast($7, PerfectWidgets.Model.BaseElements.SmartValue)) {
                            var $8 = new PerfectWidgets.Model.BaseElements.SmartValue();
                            if ($5.endsWith('%')) {
                                $8.setKind(PerfectWidgets.Model.BaseElements.SmartValueKind.percent);
                                $8.setValue(parseFloat($5.substr(0, $5.length - 1)));
                            } else {
                                $8.setKind(PerfectWidgets.Model.BaseElements.SmartValueKind.constant);
                                $8.setValue(parseFloat($5));
                            }
                            $6['set' + $4]($8);
                        } else if ((typeof($6['set' + $4]) === 'function')) {
                            $6['set' + $4](parseFloat($5));
                        }
                    }
                }
            }
        },
        $2: function($p0) {
            return $p0.substr(0, 1).toLowerCase() + $p0.substr(1);
        },
        $3: function($p0) {
            var $0 = null;
            switch ($p0) {
                case 'Circle:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Circle();
                    break;
                case 'ScaleLabels:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.ScaleLabels();
                    break;
                case 'Slider:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Slider();
                    break;
                case 'Ticks:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Ticks();
                    break;
                case 'Joint:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Joint();
                    break;
                case 'Scale:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Scale();
                    break;
                case 'EmptyFill:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.EmptyFill();
                    break;
                case 'SolidFill:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.SolidFill(null);
                    break;
                case 'LinearGradientFill:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.LinearGradientFill();
                    break;
                case 'MultiGradientFill:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.MultiGradientFill();
                    break;
                case 'ConicalFill:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.ConicalFill();
                    break;
                case 'HatchFill:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.HatchFill();
                    break;
                case 'SimpleStroke:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.Stroke();
                    break;
                case 'GradientColor:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.GradientColor(null, 0);
                    break;
                case 'EmptyStroke:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.Stroke();
                    break;
                case 'SphericalFill:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.SphericalFill();
                    break;
                case 'Needle:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Needle();
                    break;
                case 'NeedlePoint:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.NeedlePoint();
                    break;
                case 'Rectangle:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Rectangle();
                    break;
                case 'RangedLevel:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.RangedLevel();
                    break;
                case 'Highlight:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Highlight();
                    break;
                case 'RoundedRectangle:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.RoundedRectangle();
                    break;
                case 'RingSector:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.RingSector();
                    break;
                case 'Arc:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Arc();
                    break;
                case 'Ellipse:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Ellipse();
                    break;
                case 'Pie:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Pie();
                    break;
                case 'Label:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Label();
                    break;
                case 'TrialLabel:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.TrialLabel();
                    break;
                case 'Picture:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Picture();
                    break;
                case 'PictureSet:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.PictureSet();
                    break;
                case 'SingleColorColorizer:#PerpetuumSoft.Instrumentation.Model.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.SingleColorColorizer();
                    break;
                case 'SectionsColorizer:#PerpetuumSoft.Instrumentation.Model.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.SectionsColorizer();
                    break;
                case 'ColorSection:#PerpetuumSoft.Instrumentation.Model.Drawing':
                    $0 = new PerfectWidgets.Framework.Drawing.ColorSection();
                    break;
                case 'SmartValueWrapper:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.SmartValue();
                    break;
                case 'Star:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Star();
                    break;
                case 'Polygon:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Polygon();
                    break;
                case 'Gear:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Gear();
                    break;
                case 'CustomLabels:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.CustomLabels();
                    break;
                case 'TextItem:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.TextItem();
                    break;
                case 'TruncatedEllipse:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.TruncatedEllipse();
                    break;
                case 'ScaleMarks:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.ScaleMarks();
                    break;
                case 'RoundRectangleShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.RoundRectangleShape();
                    break;
                case 'StarShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.StarShape();
                    break;
                case 'RectangleShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.RectangleShape();
                    break;
                case 'EllipseShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.EllipseShape();
                    break;
                case 'DiamondShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.DiamondShape();
                    break;
                case 'RectTriangleShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.RectTriangleShape();
                    break;
                case 'ArrowShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.ArrowShape();
                    break;
                case 'LineShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.LineShape();
                    break;
                case 'ParallelogramShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.ParallelogramShape();
                    break;
                case 'LinearLevel:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.LinearLevel();
                    break;
                case 'Guide:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Guide();
                    break;
                case 'Tank:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Tank();
                    break;
                case 'NumericLabels:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.ScaleLabels();
                    break;
                case 'Line:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Line();
                    break;
                case 'TriangleShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.TriangleShape();
                    break;
                case 'CrossShape:#PerpetuumSoft.Framework.Drawing':
                    $0 = new PerfectWidgets.Model.BaseElements.CrossShape();
                    break;
                case 'Spring:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Spring();
                    break;
                case 'CircularNotches:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.CircularNotches();
                    break;
                case 'LinearNotches:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.LinearNotches();
                    break;
                case 'ScaleTitle:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.ScaleTitle();
                    break;
                case 'Digits:#PerpetuumSoft.Instrumentation.Model.Specialized':
                    $0 = new PerfectWidgets.Model.BaseElements.Digits();
                    break;
                case 'Frame:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Frame();
                    break;
                case 'Odometer:#PerpetuumSoft.Instrumentation.Model.Specialized':
                    $0 = new PerfectWidgets.Model.BaseElements.Odometer();
                    break;
                case 'DigitalText:#PerpetuumSoft.Instrumentation.Model.Specialized':
                    $0 = new PerfectWidgets.Model.BaseElements.DigitalText();
                    break;
                case 'Group:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.Group();
                    break;
                case 'PushButton:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.PushButton();
                    break;
                case 'Style:#PerpetuumSoft.Instrumentation.Styles':
                    $0 = new PerfectWidgets.Framework.Styles.Style();
                    break;
                case 'StyleCollection:#PerpetuumSoft.Instrumentation.Styles':
                    $0 = new PerfectWidgets.Framework.Styles.StyleCollection();
                    break;
                case 'TextLabels:#PerpetuumSoft.Instrumentation.Model':
                    $0 = new PerfectWidgets.Model.BaseElements.CustomLabels();
                    break;
                default:
                    alert($p0 + ' is unknown type');
                    break;
            }
            return $0;
        },
        $4: function($p0, $p1, $p2) {
            var $0 = PerfectWidgets.Serialization.PropertyTranslator.translate($p2);
            var $1 = $p1[$p2];
            if ((typeof($p0['set' + $0]) === 'function')) {
                $p0['set' + $0]($1);
            }
        },
        $5: function($p0, $p1) {
            $p1.ApplyBinding = new Function($p0);
            $p1.add_recalculating(new Function('sender', 'args', 'var binding = sender["ApplyBinding"]; binding.apply(sender);'));
        },
        $6: function($p0) {
            var $0 = null;
            if ($p0.hasOwnProperty('__type')) {
                var $1 = Type.safeCast($p0.__type, String);
                $0 = this.$3($1);
            } else {
                $0 = new PerfectWidgets.Model.BaseElements.Instrument();
            }
            if ($0 != null) {
                var $2 = Type.safeCast(Type.getInstanceType($p0).getOwnPropertyNames($p0), Array);
                var $enum1 = ss.IEnumerator.getEnumerator($2);
                while ($enum1.moveNext()) {
                    var $3 = $enum1.current;
                    var $4 = $p0[$3];
                    if ($4 == null || Type.getInstanceType($4) !== Array && Type.getInstanceType($4) !== Object && $3 !== 'Base64String' && $3 !== 'CssClassWrapper' && $3 !== 'JSBindingsText') {
                        this.$4($0, $p0, $3);
                    } else {
                        switch ($3) {
                            case 'Elements':
                                var $5 = $4;
                                var $enum2 = ss.IEnumerator.getEnumerator($5);
                                while ($enum2.moveNext()) {
                                    var $12 = $enum2.current;
                                    var $13 = this.$6($12);
                                    if ($13 != null) {
                                        var $14 = $0;
                                        $14.getElements().add($13, $14);
                                    }
                                }
                                break;
                            case 'JSBindingsText':
                                this.$5($4, $0);
                                break;
                            case 'Size':
                            case 'Center':
                            case 'EndPoint':
                            case 'StartPoint':
                            case 'MarksSize':
                            case 'SubMarksSize':
                            case 'SegmentSize':
                            case 'SegmentSpaces':
                                var $6 = $4.X;
                                var $7 = $4.Y;
                                $0['set' + $3](new PerfectWidgets.Framework.DataObjects.Vector($6, $7));
                                break;
                            case 'Colors':
                                var $8 = new PerfectWidgets.Framework.Drawing.GradientColorCollection();
                                var $enum3 = ss.IEnumerator.getEnumerator($4);
                                while ($enum3.moveNext()) {
                                    var $15 = $enum3.current;
                                    $8.add(this.$6($15));
                                }
                                $0.setColors($8);
                                break;
                            case 'TankColor':
                            case 'LiquidColor':
                            case 'Color':
                            case 'EndColor':
                            case 'StartColor':
                            case 'ActiveColor':
                            case 'InactiveColor':
                            case 'LightColor':
                            case 'DarkColor':
                                var $9 = $4.value;
                                var $A = $4.state;
                                var $B = Type.safeCast($4.name, String);
                                var $C = $4.knownColor;
                                var $D = new PerfectWidgets.Framework.Drawing.Color($9, $A, $B, $C);
                                if ((this.$2($3) in $0)) {
                                    $0[this.$2($3)] = $D;
                                } else if ((typeof($0['set' + $3]) === 'function')) {
                                    $0['set' + $3]($D);
                                }
                                break;
                            case 'Font':
                                var $E = 0;
                                if ($4.Bold === 1) {
                                    $E |= PerfectWidgets.Framework.Drawing.FontStyle.bold;
                                }
                                if ($4.Italic === 1) {
                                    $E |= PerfectWidgets.Framework.Drawing.FontStyle.italic;
                                }
                                if ($4.Underline === 1) {
                                    $E |= PerfectWidgets.Framework.Drawing.FontStyle.underline;
                                }
                                if ($4.Strikeout === 1) {
                                    $E |= PerfectWidgets.Framework.Drawing.FontStyle.strikeout;
                                }
                                var $F = new PerfectWidgets.Drawing.Font();
                                var $10 = new PerfectWidgets.Framework.Drawing.FontFamily();
                                $10.name = Type.safeCast($4.FamilyName, String);
                                $F.fontFamily = $10;
                                $F.sizeInPoints = $4.Size;
                                $F.style = $E;
                                $0['set' + $3]($F);
                                break;
                            case 'MinLimit':
                                break;
                            case 'MaxLimit':
                                break;
                            case 'Base64String':
                                $0.setImage(new PerfectWidgets.Framework.Drawing.Image($4));
                                break;
                            case 'ImagesList':
                                var $11 = [];
                                var $enum4 = ss.IEnumerator.getEnumerator($4);
                                while ($enum4.moveNext()) {
                                    var $16 = $enum4.current;
                                    $11.add(new PerfectWidgets.Framework.Drawing.Image($16));
                                }
                                $0.setImages($11);
                                break;
                            case 'CssClassWrapper':
                                if (!!($4)) {
                                    if ($4 !== 'none') {
                                        $0.setClassName($4);
                                    }
                                }
                                break;
                            default:
                                if (Type.canCast($4, Array)) {
                                    var $17 = $4;
                                    var $18 = [];
                                    for (var $19 = 0; $19 < $17.length; $19++) {
                                        if ($17[$19].hasOwnProperty('__type')) {
                                            if ((typeof($0['set' + $3]) === 'function')) {
                                                $18.add(this.$6($17[$19]));
                                            }
                                        }
                                    }
                                    if (!!$18.length) {
                                        $0['set' + $3]($18);
                                    }
                                } else {
                                    if ($4.hasOwnProperty('__type')) {
                                        var $1A = $3;
                                        if ($3.endsWith('Wrapper')) {
                                            var $1B = $3.lastIndexOf('Wrapper');
                                            $1A = $3.substr(0, $1B);
                                        }
                                        if ((typeof($0['set' + $1A]) === 'function')) {
                                            var $1C = this.$6($4);
                                            $0['set' + $1A]($1C);
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }
            }
            return $0;
        }
    }
    Type.registerNamespace('PerfectWidgets.Serialization');
    PerfectWidgets.Serialization.PropertyTranslator = function() {}
    PerfectWidgets.Serialization.PropertyTranslator.translate = function(propertyName) {
        switch (propertyName) {
            case 'DashLenght':
                return 'DashLength';
            case 'DotLenght':
                return 'DotLength';
            case 'SpaceLenght':
                return 'SpaceLength';
            default:
                return propertyName;
        }
    }
    Type.registerNamespace('PerfectWidgets.View');
    PerfectWidgets.View.ElementView = function(element) {
        PerfectWidgets.View.ElementView.initializeBase(this);
        this.$1_2 = element;
        this.setOrigin(PerfectWidgets.View.ElementView.$1_1());
        this.setScale(PerfectWidgets.View.ElementView.$1_0());
    }
    PerfectWidgets.View.ElementView.$1_0 = function() {
        return new PerfectWidgets.Framework.DataObjects.Vector(1, 1);
    }
    PerfectWidgets.View.ElementView.$1_1 = function() {
        return new PerfectWidgets.Framework.DataObjects.Vector(0, 0);
    }
    PerfectWidgets.View.ElementView.prototype = {
        locationToScreen: function(value) {
            return this.valueToScreen(value);
        },
        $1_2: null,
        getElement: function() {
            return this.$1_2;
        },
        changeZoom: function(center, scale) {
            var $0 = PerfectWidgets.View.ElementView.$1_1();
            var $1 = center.minus($0);
            var $2 = $1.multiply(scale.divide(PerfectWidgets.View.ElementView.$1_0()));
            var $3 = $2.minus($1);
            var $4 = $0.minus($3);
            this.setOrigin($4);
            this.setScale(scale);
            this.getElement().setNeedRepaint(true);
            this.getElement().refreshElement();
        },
        toElement: function(point) {
            return this.scaleFromScreen(point.minus(this.getOrigin()));
        },
        toView: function(point) {
            return this.valueToScreen(point).add(this.getOrigin());
        },
        getElementAt: function(point) {
            return this.getElement().getElementAt(point);
        },
        paint: function(painter) {
            var $0 = this.getOrigin();
            var $1 = this.getScale();
            var $2 = PerfectWidgets.Framework.Drawing.Unit.convert($0.x, PerfectWidgets.Framework.Drawing.Unit.internalUnit, PerfectWidgets.Framework.Drawing.Unit.pixel);
            var $3 = PerfectWidgets.Framework.Drawing.Unit.convert($0.y, PerfectWidgets.Framework.Drawing.Unit.internalUnit, PerfectWidgets.Framework.Drawing.Unit.pixel);
            var $4 = PerfectWidgets.Framework.DataObjects.Matrix.buildTranslationMatrix($2, $3).multiply(PerfectWidgets.Framework.DataObjects.Matrix.buildScaleMatrix($1.x, $1.y));
            painter.setContext(this.getElement());
            painter.startTransformation($4);
            this.$1_3(painter);
            painter.endTransformation();
        },
        $1_3: function($p0) {
            this.getElement().paint($p0);
        }
    }
    Type.registerNamespace('PerfectWidgets');
    PerfectWidgets.Widget = function(id, jsonModel, jsonParams, tool, view) {
        this.$1_B = PerfectWidgets.Framework.DataObjects.Vector.empty;
        this.$1_C = PerfectWidgets.Framework.DataObjects.Vector.empty;
        this.$1_D = PerfectWidgets.Framework.DataObjects.VectorRectangle.empty;
        this.$1_F = new PerfectWidgets.Model.Serialization.JSONParser();
        PerfectWidgets.Widget.initializeBase(this);
        var $0 = true;
        var $1 = id;
        if (jsonParams != null) {
            if (('keepRatio' in jsonParams)) {
                $0 = jsonParams.keepRatio;
            }
            if (('uniqueClassName' in jsonParams)) {
                $1 = jsonParams.uniqueClassName;
            }
            if (('interactive' in jsonParams)) {
                this.$1_12 = jsonParams.interactive;
            }
        }
        if (tool == null) {
            tool = new PerfectWidgets.Model.View.PickTool();
        }
        var $2 = null;
        if (view == null) {
            $2 = this.$1_F.parse(jsonModel, jsonParams);
            $2.setUniqueClassName($1);
            $2.setInvalidationHandler(ss.Delegate.create(this, this.$1_24));
            $2.endInitializing();
            view = new PerfectWidgets.View.ElementView($2);
        }
        this.setTool(tool);
        this.setView(view);
        this.$1_A = document.getElementById(id);
        this.$1_29();
        var $3 = this.$1_28();
        document.body.style.cursor = 'default';
        this.$1_A.setAttribute('onselectstart', 'return false');
        this.$1_13 = ss.Delegate.create(this, this.mouseDown);
        this.$1_14 = ss.Delegate.create(this, this.mouseUp);
        this.$1_15 = ss.Delegate.create(this, this.mouseMove);
        this.$1_16 = ss.Delegate.create(this, this.mouseOver);
        this.$1_17 = ss.Delegate.create(this, this.mouseOut);
        this.$1_18 = ss.Delegate.create(this, this.touchStart);
        this.$1_19 = ss.Delegate.create(this, this.touchEnd);
        this.$1_1A = ss.Delegate.create(this, this.touchMove);
        this.$1_1B = ss.Delegate.create(this, this.touchLeave);
        this.$1_1C = ss.Delegate.create(this, this.touchCancel);
        document.addEventListener('mousedown', this.$1_13, false);
        document.addEventListener('mouseup', this.$1_14, false);
        document.addEventListener('mousemove', this.$1_15, false);
        this.$1_A.addEventListener('mouseover', this.$1_16, false);
        this.$1_A.addEventListener('mouseout', this.$1_17, false);
        document.addEventListener('touchstart', this.$1_18, false);
        document.addEventListener('touchend', this.$1_19, false);
        document.addEventListener('touchmove', this.$1_1A, false);
        this.$1_A.addEventListener('touchleave', this.$1_1B, false);
        this.$1_A.addEventListener('touchcancel', this.$1_1C, false);
        var $4 = null;
        var $5 = null;
        var $6 = Math.max(PerfectWidgets.Framework.Drawing.Unit.internalToPixel((view.getElement()).getBoundedBox().width), PerfectWidgets.Framework.Drawing.Unit.internalToPixel((view.getElement()).getSize().x));
        var $7 = Math.max(PerfectWidgets.Framework.Drawing.Unit.internalToPixel((view.getElement()).getBoundedBox().height), PerfectWidgets.Framework.Drawing.Unit.internalToPixel((view.getElement()).getSize().y));
        var $8 = new PerfectWidgets.Framework.DataObjects.Vector($6, $7);
        var $9 = new PerfectWidgets.Framework.DataObjects.Vector(this.$1_A.offsetWidth, this.$1_A.offsetHeight);
        if (!$9.y) {
            $5 = $8;
        } else {
            if ($0 == null || $0) {
                var $A = Math.min($3.x / $8.x, $3.y / $8.y);
                $4 = new PerfectWidgets.Framework.DataObjects.Vector($A, $A);
            } else {
                $4 = new PerfectWidgets.Framework.DataObjects.Vector($3.x / $8.x, $3.y / $8.y);
            }
            $5 = $8.multiply($4);
        }
        this.$1_C = $5;
        this.$1_D = new PerfectWidgets.Framework.DataObjects.VectorRectangle(0, 0, $5.x, $5.y);
        this.$1_E = new PerfectWidgets.Drawing.SvgPainter(id, this.$1_C, this.$1_D);
        this.$1_E.setContext($2);
        this.$1_E.startTransformation(PerfectWidgets.Framework.DataObjects.Matrix.eye(3));
        $2.refreshElement();
        if ($4 != null) {
            this.getView().changeZoom(new PerfectWidgets.Framework.DataObjects.Vector(0, 0), $4);
        }
        this.$1_11 = false;
    }
    PerfectWidgets.Widget.writeLog = function(text) {}
    PerfectWidgets.Widget.prototype = {
        $1_A: null,
        $1_E: null,
        $1_10: null,
        $1_11: true,
        $1_12: true,
        $1_13: null,
        $1_14: null,
        $1_15: null,
        $1_16: null,
        $1_17: null,
        $1_18: null,
        $1_19: null,
        $1_1A: null,
        $1_1B: null,
        $1_1C: null,
        $1_1D: false,
        mouseDown: function(e) {
            if (!this.$1_12) {
                return;
            }
            this.$1_B = this.$1_27(e);
            if (!this.hitTest(this.$1_1E, this.$1_1F)) {
                return;
            }
            this.$1_1D = true;
            if (this.$1_11) {
                e.preventDefault();
            }
            this.getTool().onManipulationStarted(this.$1_23(e));
        },
        mouseUp: function(e) {
            if (!this.$1_12) {
                return;
            }
            this.$1_B = this.$1_27(e);
            if (!this.hitTest(this.$1_1E, this.$1_1F) && !this.$1_1D) {
                return;
            }
            this.$1_1D = false;
            if (this.$1_11) {
                e.preventDefault();
            }
            this.getTool().onManipulationEnded(this.$1_23(e));
        },
        $1_1E: 0,
        $1_1F: 0,
        mouseMove: function(e) {
            if (!this.$1_12) {
                return;
            }
            this.$1_B = this.$1_27(e);
            if (!this.hitTest(this.$1_1E, this.$1_1F) && !this.$1_1D) {
                return;
            }
            if (this.$1_11) {
                e.preventDefault();
            }
            this.getTool().onPointerMove(this.$1_23(e));
        },
        hitTest: function(x, y) {
            var $0 = this.$1_A;
            var $1, $2;
            for ($1 = 0, $2 = 0; $0 != null; $1 += $0.offsetLeft, $2 += $0.offsetTop, $0 = $0.offsetParent) {}
            return x > $1 && x < $1 + this.$1_A.offsetWidth && y > $2 && y < $2 + this.$1_A.offsetHeight;
        },
        mouseOver: function(e) {
            this.$1_11 = true;
        },
        mouseOut: function(e) {
            this.$1_11 = false;
        },
        touchStart: function(e) {
            if (!this.$1_12) {
                return;
            }
            var $0 = this.$1_21(e);
            var $enum1 = ss.IEnumerator.getEnumerator($0);
            while ($enum1.moveNext()) {
                var $1 = $enum1.current;
                this.$1_B = this.$1_22($1);
                var $2 = this.$1_20($1);
                if ($2.view().getElementAt($2.getManipulationOrigin()) != null) {
                    e.preventDefault();
                }
                this.getTool().onManipulationStarted($2);
            }
        },
        touchEnd: function(e) {
            if (!this.$1_12) {
                return;
            }
            var $0 = this.$1_21(e);
            var $enum1 = ss.IEnumerator.getEnumerator($0);
            while ($enum1.moveNext()) {
                var $1 = $enum1.current;
                this.$1_B = this.$1_22($1);
                var $2 = this.$1_20($0[0]);
                if ($2.view().getElementAt($2.getManipulationOrigin()) != null) {
                    e.preventDefault();
                }
                this.getTool().onManipulationEnded($2);
            }
        },
        touchMove: function(e) {
            if (!this.$1_12) {
                return;
            }
            var $0 = this.$1_21(e);
            if ($0.length > 0 && $0.length < 2) {
                var $enum1 = ss.IEnumerator.getEnumerator($0);
                while ($enum1.moveNext()) {
                    var $1 = $enum1.current;
                    var $2 = this.$1_22($1);
                    if (Math.abs($2.minus(this.$1_B).getLength()) > 4) {
                        this.$1_B = this.$1_22($1);
                        var $3 = this.$1_20($1);
                        if ($3.view().getElementAt($3.getManipulationOrigin()) != null) {
                            e.preventDefault();
                        }
                        this.getTool().onPointerMove($3);
                    }
                }
            }
        },
        touchLeave: function(e) {},
        touchCancel: function(e) {},
        $1_20: function($p0) {
            var $0 = this.$1_22($p0).minus(this.$1_B);
            var $1 = new PerfectWidgets.Model.Manipulator.ManipulationDelta(0, PerfectWidgets.Framework.DataObjects.Vector.empty, $0);
            var $2 = new PerfectWidgets.Model.Manipulator.ManipulationArguments(this.$1_B, $1, this.getView(), this.hitTest(this.$1_1E, this.$1_1F));
            return $2;
        },
        $1_21: function($p0) {
            var $0 = null;
            var $1 = $p0.changedTouches;
            var $2 = $1.length;
            $0 = new Array($2);
            for (var $3 = 0; $3 < $2; $3++) {
                var $4 = new PerfectWidgets._Touch();
                var $5 = $1[$3];
                $4.id = $5.id;
                $4.$0 = $5.screenX;
                $4.$1 = $5.screenY;
                $4.$2 = $5.clientX;
                $4.$3 = $5.clientY;
                $4.$4 = $5.pageX;
                $4.$5 = $5.pageY;
                $4.$6 = $5.radiusX;
                $4.$7 = $5.radiusY;
                $4.$8 = $5.rotationAngle;
                $4.$9 = $5.force;
                $4.$A = $5.target;
                $0[$3] = $4;
            }
            return $0;
        },
        $1_22: function($p0) {
            this.$1_1E = $p0.$4;
            this.$1_1F = $p0.$5;
            var $0 = $p0.$4 - this.$1_A.offsetParent.offsetLeft - this.$1_A.offsetLeft - this.$1_10.x;
            var $1 = $p0.$5 - this.$1_A.offsetParent.offsetTop - this.$1_A.offsetTop - this.$1_10.y;
            var $2 = PerfectWidgets.Framework.Drawing.Unit.convert($0, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
            var $3 = PerfectWidgets.Framework.Drawing.Unit.convert($1, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
            return this.getView().toElement(new PerfectWidgets.Framework.DataObjects.Vector($2, $3));
        },
        $1_23: function($p0) {
            var $0 = this.$1_27($p0).minus(this.$1_B);
            var $1 = new PerfectWidgets.Model.Manipulator.ManipulationDelta(0, PerfectWidgets.Framework.DataObjects.Vector.empty, $0);
            var $2 = new PerfectWidgets.Model.Manipulator.ManipulationArguments(this.$1_B, $1, this.getView(), this.hitTest(this.$1_1E, this.$1_1F));
            return $2;
        },
        $1_24: function($p0, $p1) {
            this.getView().paint(this.$1_E);
        },
        $1_25: null,
        $1_26: function() {
            if (this.$1_25 == null) {
                this.$1_25 = this.$1_A.offsetParent;
            }
            return this.$1_25;
        },
        $1_27: function($p0) {
            this.$1_1E = $p0.pageX;
            this.$1_1F = $p0.pageY;
            var $0 = this.$1_1E - this.$1_26().offsetLeft - this.$1_A.offsetLeft - this.$1_10.x;
            var $1 = this.$1_1F - this.$1_26().offsetTop - this.$1_A.offsetTop - this.$1_10.y;
            var $2 = PerfectWidgets.Framework.Drawing.Unit.convert($0, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
            var $3 = PerfectWidgets.Framework.Drawing.Unit.convert($1, PerfectWidgets.Framework.Drawing.Unit.pixel, PerfectWidgets.Framework.Drawing.Unit.internalUnit);
            return this.getView().toElement(new PerfectWidgets.Framework.DataObjects.Vector($2, $3));
        },
        $1_28: function() {
            var $0 = document.createElement('div');
            $0.innerHTML = '&nbsp;';
            $0.style.height = '100%';
            $0.style.width = '100%';
            this.$1_A.appendChild($0);
            var $1 = new PerfectWidgets.Framework.DataObjects.Vector($0.offsetWidth, $0.offsetHeight);
            this.$1_10 = new PerfectWidgets.Framework.DataObjects.Vector($0.offsetLeft - this.$1_A.offsetLeft, $0.offsetTop - this.$1_A.offsetTop);
            this.$1_A.removeChild($0);
            return $1;
        },
        $1_29: function() {
            while (this.$1_A.firstChild != null) {
                this.$1_A.removeChild(this.$1_A.firstChild);
            }
        },
        getByName: function(name) {
            return this.getView().getElement().getByName(name);
        },
        getInteractive: function() {
            return this.$1_12;
        },
        setInteractive: function(interactive) {
            this.$1_12 = interactive;
        },
        dispose: function() {
            document.removeEventListener('mousedown', this.$1_13, false);
            document.removeEventListener('mouseup', this.$1_14, false);
            document.removeEventListener('mousemove', this.$1_15, false);
            this.$1_A.removeEventListener('mouseover', this.$1_16, false);
            this.$1_A.removeEventListener('mouseout', this.$1_17, false);
            document.removeEventListener('touchstart', this.$1_18, false);
            document.removeEventListener('touchend', this.$1_19, false);
            document.removeEventListener('touchmove', this.$1_1A, false);
            this.$1_A.removeEventListener('touchleave', this.$1_1B, false);
            this.$1_A.removeEventListener('touchcancel', this.$1_1C, false);
            while (this.$1_A.hasChildNodes()) {
                this.$1_A.removeChild(this.$1_A.lastChild);
            }
            this.$1_A.removeAttribute('onselectstart');
        }
    }
    PerfectWidgets._Touch = function() {}
    PerfectWidgets._Touch.prototype = {
        id: 0,
        $0: 0,
        $1: 0,
        $2: 0,
        $3: 0,
        $4: 0,
        $5: 0,
        $6: 0,
        $7: 0,
        $8: 0,
        $9: 0,
        $A: 0
    }
    PerfectWidgets.Drawing.SvgBuilder.registerClass('PerfectWidgets.Drawing.SvgBuilder');
    PerfectWidgets.Drawing.SvgPainter.registerClass('PerfectWidgets.Drawing.SvgPainter', null, PerfectWidgets.Model.Drawing.IPainter);
    PerfectWidgets.Model.View.PickTool.registerClass('PerfectWidgets.Model.View.PickTool', PerfectWidgets.Model.View.Tool);
    WidgetBehavior.MovingDigitalText.registerClass('WidgetBehavior.MovingDigitalText');
    WidgetBehavior.RandoOdometer.registerClass('WidgetBehavior.RandoOdometer');
    WidgetBehavior.RandoDigits.registerClass('WidgetBehavior.RandoDigits');
    PerfectWidgets.Model.Serialization.JSONParser.registerClass('PerfectWidgets.Model.Serialization.JSONParser');
    PerfectWidgets.Serialization.PropertyTranslator.registerClass('PerfectWidgets.Serialization.PropertyTranslator');
    PerfectWidgets.View.ElementView.registerClass('PerfectWidgets.View.ElementView', PerfectWidgets.Model.View.AbstractView);
    PerfectWidgets.Widget.registerClass('PerfectWidgets.Widget', PerfectWidgets.Model.View.ViewManager);
    PerfectWidgets._Touch.registerClass('PerfectWidgets._Touch');
    PerfectWidgets.Drawing.SvgBuilder.$3 = 1 / 3;
})(); // This script was generated using Script# v0.7.4.0