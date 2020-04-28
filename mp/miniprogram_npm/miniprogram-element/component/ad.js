/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/ad.html
 */
module.exports = {
    properties: [{
        name: 'unitId',
        get(domNode) {
            return domNode.getAttribute('unit-id') || ''
        },
    }, {
        name: 'adIntervals',
        get(domNode) {
            return +domNode.getAttribute('ad-intervals') || 0
        },
    }],
    handles: {
        onAdLoad(evt) {
            this.callSingleEvent('load', evt)
        },

        onAdError(evt) {
            this.callSingleEvent('error', evt)
        },

        onAdClose(evt) {
            this.callSingleEvent('close', evt)
        },
    },
}
