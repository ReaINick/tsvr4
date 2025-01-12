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
        betterDealersLevel: 0,
        baseScavenging: 0.2,
        luck: 1, // Starting luck
        upgradeCost: 100, // Initial cost for upgrades
    },
    methods: {
        earnGold() {
            let goldEarned = this.baseScavenging + this.getScavengingMultiplier();
            this.gold += goldEarned;

            // Check for ascension
            this.checkAscension();

            // Chance to earn silver or diamond coins
            if (Math.random() < (0.01 * this.getLuckMultiplier())) { // 1% chance for silver
                this.silver += 1;
            }
            if (Math.random() < (0.001 * this.getLuckMultiplier())) { // 0.1% chance for diamond
                this.diamond += 1;
            }
        },
        checkAscension() {
            if (this.gold >= 1e9) { // Check if player has at least 1 billion gold
                let additionalFragments = Math.floor(this.gold / 1e9);
                this.fragments += additionalFragments; // Earn fragments based on billion thresholds
                this.gold = 0; // Reset gold after ascending
                alert(`You have ascended! You earned ${additionalFragments} fragment(s).`);
            }
        },
        getScavengingMultiplier() {
            let multiplier = Math.floor(this.scavengingLevel / 25);
            if (this.scavengingLevel < 500) {
                return this.baseScavenging * Math.pow(4, multiplier);
            } else {
                return this.baseScavenging * Math.pow(4, multiplier) * Math.floor((this.scavengingLevel - 500) / 100) * 10;
            }
        },
        getLuckMultiplier() {
            return this.luck + (this.inventoryLevel > 10 ? (this.inventoryLevel - 10) * 2 : this.inventoryLevel);
        },
        upgradeScavenging() {
            if (this.gold >= this.upgradeCost) {
                this.scavengingLevel += 1; // Increment scavenging level
                this.gold -= this.upgradeCost; // Deduct cost
                this.upgradeCost = Math.ceil(this.upgradeCost * 1.2); // Increase cost by 20%
            } else {
                alert("Not enough gold to upgrade scavenging!");
            }
        },
        upgradeInventory() {
            if (this.gold >= this.upgradeCost) {
                if (this.inventoryLevel < 10) {
                    this.inventoryLevel += 1; // Increment inventory level
                    this.gold -= this.upgradeCost; // Deduct cost
                    if (this.inventoryLevel === 10) {
                        this.luck += 10; // Double the luck at max level
                    }
                    this.upgradeCost = Math.ceil(this.upgradeCost * 1.2); // Increase cost by 20%
                } else {
                    alert("Maximum inventory level reached!");
                }
            } else {
                alert("Not enough gold to upgrade inventory!");
            }
        },
        upgradeBetterDealers() {
            if (this.gold >= this.upgradeCost && this.betterDealersLevel < 5) {
                this.betterDealersLevel += 1; // Increment Better Dealers level
                let reduction = Math.min(70, this.betterDealersLevel * 10); // Max reduction of 70%
                alert(`Better Dealers upgraded to level ${this.betterDealersLevel}. Current price reduction: ${reduction}%`);
                
                // Apply price reduction logic here for future upgrades, if needed.
                
                this.gold -= this.upgradeCost; // Deduct cost
                this.upgradeCost = Math.ceil(this.upgradeCost * 1.2); // Increase cost by 20%
            } else if (this.betterDealersLevel >= 5) {
                alert("Maximum Better Dealers level reached!");
            } else {
                alert("Not enough gold to upgrade Better Dealers!");
            }
        },
        formatNumber(num) {
            return Math.floor(num); // Return only whole numbers
        }
    }
});
