const { Point, Vector, ClientRect } = require('../dataTypes');
const LayerMask = require('./LayerMask');

class TableMaskCreator extends LayerMask {

    /**
     * @private
     * @param {Dimension} canvasDimension
     * @param {Boolean} isFixed
     * @param {Array.<ClientRect>} rectangles
     * @return {Element}
     */
    buildMask(canvasDimension, isFixed, rectangles) {

        const colPositions = ClientRect.mapVertexesToAxisX(rectangles);
        const rowPositions = ClientRect.mapVertexesToAxisY(rectangles);

        const container = document.createElement('div');
        if (this.config.debug) {
            container.classList.add(this.config.classesDebug);
        }

        this.addChildren(container, rowPositions.length, 'div', (row, i) => {
            const rowInitial = rowPositions[i];
            const rowTerminal = rowPositions[i + 1];

            row.classList.add(this.config.classesTableRow);
            if (rowTerminal) {
                row.style.height = this.px(rowTerminal - rowInitial);
            }

            this.addChildren(row, colPositions.length, 'div', (cell, j) => {
                const colInitial = colPositions[j];
                const colTerminal = colPositions[j + 1];

                cell.classList.add(this.config.classesTableCell);
                if (colTerminal) {
                    cell.style.width = this.px(colTerminal - colInitial);
                }

                if (rowTerminal !== undefined && colTerminal !== undefined) {
                    const initialPoint = new Point(colInitial, rowInitial);
                    const terminalPoint = new Point(colTerminal, rowTerminal);
                    const vector = new Vector(initialPoint, terminalPoint);

                    if (rectangles.some(r => r.isVectorCollides(vector))) {
                        cell.classList.add(this.config.classesTableCellHole);
                    }
                }
            });
        });

        container.classList.add(this.config.classes, this.config.classesTable);
        if (isFixed) {
            container.classList.add(this.config.classesFixed);
        }

        return container;
    }

    /**
     * @private
     * @param {number} value
     * @return {string}
     */
    px(value) {
        return `${value}px`;
    }

    /**
     * @private
     * @param {Element} container
     * @param {number} count
     * @param {string} tagName
     * @param {?Function} [cb]
     */
    addChildren(container, count, tagName, cb = undefined) {
        for (let i = 0; i < count; i++) {
            const child = document.createElement(tagName);
            container.appendChild(child);
            if (cb) {
                cb(child, i);
            }
        }
    }

}



module.exports = TableMaskCreator;