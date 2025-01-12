var app = new Vue({
    el: '#app',
    data: {
        gold: 0,
        silver: 0,
        diamond: 0,
        platinum: 0,
        fragments: 0,
        scavengingLevel: 0,
        inventoryLevel: 0,
        baseScavenging: 0.2,
        luck: 1, // Starting luck
    },
    methods: {
        earnGold() {
            // Calculate the amount of gold earned based on scavenging
            let goldEarned = this.baseScavenging + this.getScavengingMultiplier();
            this.gold += goldEarned;

            // Chance to earn silver or diamond coins
            if (Math.random() < (0.01 * this.getLuckMultiplier())) { // 1% chance for silver
                this.silver += 1;
            }
            if (Math.random() < (0.001 * this.getLuckMultiplier())) { // 0.1% chance for diamond
                this.diamond += 1;
            }
        },
        getScavengingMultiplier() {
            // Calculate multiplier based on scavenging level
            let multiplier = Math.floor(this.scavengingLevel / 25);
            if (this.scavengingLevel < 500) {
                return this.baseScavenging * Math.pow(4, multiplier);
            } else {
                return this.baseScavenging * Math.pow(4, multiplier) * Math.floor((this.scavengingLevel - 500) / 100) * 10;
            }
        },
        getLuckMultiplier() {
            // Calculate luck multiplier based on inventory level
            return this.luck + (this.inventoryLevel > 10 ? (this.inventoryLevel - 10) * 2 : this.inventoryLevel);
        },
        upgradeScavenging() {
            if (this.scavengingLevel < 500) {
                this.scavengingLevel += 1; // Increment scavenging level
            } else {
                alert("Maximum scavenging level reached!");
            }
        },
        upgradeInventory() {
            if (this.inventoryLevel < 10) {
                this.inventoryLevel += 1; // Increment inventory level
                if (this.inventoryLevel === 10) {
                    this.luck += 10; // Double the luck at max level
                }
            } else {
                alert("Maximum inventory level reached!");
            }
        },
        formatNumber(num) {
            if (num >= 1e9) {
                return (num / 1e9).toFixed(2) + 'B'; // Billion
            } else if (num >= 1e6) {
                return (num / 1e6).toFixed(2) + 'M'; // Million
            } else if (num >= 1e3) {
                return (num / 1e3).toFixed(2) + 'K'; // Thousand
            } else {
                return num.toString(); // Regular number
            }
        }
    }
});
