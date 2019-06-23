var Tool = (function () {
    function Tool(block) {
        this.num = block.values.N;
        this.desc = block.getComment();
    }
    Tool.prototype.toString = function () {
        return "T" + this.num + " | " + this.desc;
    };
    return Tool;
}());
export default Tool;
//# sourceMappingURL=Tool.js.map