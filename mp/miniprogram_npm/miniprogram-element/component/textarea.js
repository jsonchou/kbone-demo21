/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/textarea.html
 */
module.exports = {
    properties: [{
        name: 'value',
        canBeUserChanged: true,
        get(domNode) {
            return domNode.value || ''
        },
    }, {
        name: 'placeholder',
        get(domNode) {
            return domNode.placeholder
        },
    }, {
        name: 'placeholderStyle',
        get(domNode) {
            return domNode.getAttribute('placeholder-style') || ''
        },
    }, {
        name: 'placeholderClass',
        get(domNode) {
            return domNode.getAttribute('placeholder-class') || 'input-placeholder'
        },
    }, {
        name: 'disabled',
        get(domNode) {
            return domNode.disabled
        },
    }, {
        name: 'maxlength',
        get(domNode) {
            const value = parseFloat(domNode.maxlength)
            return !isNaN(value) ? value : 140
        }
    }, {
        name: 'autoFocus',
        get(domNode) {
            return !!domNode.getAttribute('autofocus')
        },
    }, {
        name: 'focus',
        get(domNode) {
            return !!domNode.getAttribute('focus')
        },
    }, {
        name: 'autoHeight',
        get(domNode) {
            return !!domNode.getAttribute('auto-height')
        },
    }, {
        name: 'fixed',
        get(domNode) {
            return !!domNode.getAttribute('fixed')
        },
    }, {
        name: 'cursorSpacing',
        get(domNode) {
            return +domNode.getAttribute('cursor-spacing') || 0
        },
    }, {
        name: 'cursor',
        get(domNode) {
            const value = parseFloat(domNode.getAttribute('cursor'))
            return !isNaN(value) ? value : -1
        },
    }, {
        name: 'showConfirmBar',
        get(domNode) {
            const value = domNode.getAttribute('show-confirm-bar')
            return value !== undefined ? !!value : true
        },
    }, {
        name: 'selectionStart',
        get(domNode) {
            const value = parseFloat(domNode.getAttribute('selection-start'))
            return !isNaN(value) ? value : -1
        },
    }, {
        name: 'selectionEnd',
        get(domNode) {
            const value = parseFloat(domNode.getAttribute('selection-end'))
            return !isNaN(value) ? value : -1
        },
    }, {
        name: 'adjustPosition',
        get(domNode) {
            const value = domNode.getAttribute('adjust-position')
            return value !== undefined ? !!value : true
        },
    }],
    handles: {
        onTextareaFocus(evt) {
            const domNode = this.getDomNodeFromEvt(evt)
            if (!domNode) return

            domNode._textareaOldValue = domNode.value
            domNode.$$setAttributeWithoutUpdate('focus', true)

            // 可被用户行为改变的值，需要记录
            domNode._oldValues = domNode._oldValues || {}
            domNode._oldValues.focus = true

            this.callSimpleEvent('focus', evt)
        },

        onTextareaBlur(evt) {
            const domNode = this.getDomNodeFromEvt(evt)
            if (!domNode) return

            domNode.$$setAttributeWithoutUpdate('focus', false)

            // 可被用户行为改变的值，需要记录
            domNode._oldValues = domNode._oldValues || {}
            domNode._oldValues.focus = false

            if (domNode._textareaOldValue !== undefined && domNode.value !== domNode._textareaOldValue) {
                domNode._textareaOldValue = undefined
                this.callEvent('change', evt)
            }
            this.callSimpleEvent('blur', evt)
        },

        onTextareaLineChange(evt) {
            this.callSingleEvent('linechange', evt)
        },

        onTextareaInput(evt) {
            const domNode = this.getDomNodeFromEvt(evt)
            if (!domNode) return

            const value = '' + evt.detail.value
            domNode.$$setAttributeWithoutUpdate('value', value)

            // 可被用户行为改变的值，需要记录
            domNode._oldValues = domNode._oldValues || {}
            domNode._oldValues.value = value

            this.callEvent('input', evt)
        },

        onTextareaConfirm(evt) {
            this.callSimpleEvent('confirm', evt)
        },

        onTextareaKeyBoardHeightChange(evt) {
            this.callSingleEvent('keyboardheightchange', evt)
        },
    },
}
