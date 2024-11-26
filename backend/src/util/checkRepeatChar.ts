const set = (arr: string):string[] =>  (Array.from(arr).filter((value, index, self) => self.indexOf(value) === index));
var words = ["fresh","clove","flame","grain","joint","mango","novel","olive","prize","rapid","spice","unity","vogue","wager","zebra","amuse","batch","charm","dream","extra","ghost","index","mixer","optic","pivot","query","range","scope","thing","wafer","yeast","angel","curve","diver","erupt","flute","grace","habit","inlet","juicy","quasi","scamp","vicar","weary","yield","abode","boast","cabin","doubt","fiber","globe","ivory","joker","layer","mover","peril","quite","score","tower","uncle","voter","waive","claim","fancy","glove","heart","image","lucky","orbit","prime","quote","risky","twirl","cloud","draft","frock","grape","hotel","logic","maker","quick","rocky","abuse","carve","drive","equal","frost","major","opera","quest","trade","youth","ample","beach","elbow","march","bland","crisp","foamy","grind","latch","plank","scout","taper","whirl","zesty","bloat","champ","drift","glaze","hover","liver","noble","prick","rouse","vocal","alert","brave","cleft","equip","fiend","glint","hound","joust","lemon","mount","pouch","stump","tonic","whisk","acorn","blitz","crane","drove","epoch","flint","grasp","klutz","mirth","nudge","porch","relic","sword","tulip","viper","waltz","adore","blaze","chime","drain","flock","haste","jumpy","lapse","nifty","plumb","quilt","rival","stone","wacky","acrid", "bison", "crown", "dairy", "fable", "gains", "homer", "jokes", "laced", "noble", "pints", "roast", "shade", "tempt", "vowed", "weigh", "zoned", "amber", "brisk", "cedar","axiom", "blink", "charm", "drape", "ember", "flare", "gears", "hatch", "ideal", "jolly", "kneel", "lofty", "masky", "nudge", "opals", "prune", "quizy", "risen", "slink", "tramp", "unzip", "verge", "wacky", "xenia", "yawns","adapt", "blaze", "charm", "draft", "elite", "flood", "glove", "hatch", "inlay", "jumpy", "knack", "liver", "mocha", "needy", "pearl", "quash", "rival", "sweep", "thorn", "vivid", "whale", "youth"]

const find_words_with_repeating_letters = (words: string[]): string[] => {
    const result:string[] = []
    console.log(words.length)
    for(const word of words) {
        // # Use a set to check for repeating letters
        if (word.length != set(word).length){ // If word length is not equal to set size, it has repeating letters
            result.push(word)
        }
    }
    
    return result
}

const find_repeating_words = (words: string[]) => {
    const wordCount: Record<string, number> = {}; // Object to count word occurrences
    const repeatedWords: string[] = []; // Array to store repeated words

    // Count occurrences of each word
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Identify repeated words
    for (const word in wordCount) {
        if (wordCount[word] > 1) {
            repeatedWords.push(word);
        }
    }

    // Print the repeated words
    console.log("Repeated words:", repeatedWords);

    // Return the array with duplicates removed
    return
} 

// # Find words with repeating letters
const words_with_repeats = find_words_with_repeating_letters(words)
for(const word of words_with_repeats)
    words = words.filter(w => w != word)

const repeating_words = find_repeating_words(words)
words = words.filter((word, index) => words.indexOf(word) == index);
console.log(words_with_repeats)
console.log(JSON.stringify(words), words.length)