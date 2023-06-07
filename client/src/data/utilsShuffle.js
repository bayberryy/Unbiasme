const Shuffle = (list) => {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return list;
};

module.exports = Shuffle