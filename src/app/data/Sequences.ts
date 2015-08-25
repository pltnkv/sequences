import SequenceInfo = require("app/data/SequenceInfo")
import WordsSet = require("app/WordsSet")

var data:SequenceInfo[] = [
    {
        wordsSet: new WordsSet(['Red1', 'Orange1', 'Yellow1', 'Green', 'Blue', 'Indigo', 'Violet']),
        fact: 'Описывая радугу в своем фундаментальном труде «Оптика», Исаак Ньютон обозначил лишь красный, желтый, зеленый, голубой и фиолетовый цвета спектра. Впоследствии он добавил к ним оранжевый и синий. Почему? Великий ученый, считая, что в Природе все гармонично, решил создать соответствие между цветами радуги и основными тонами музыкальной гаммы'
    },
    {
        wordsSet: new WordsSet(['Red12', 'Orange12', 'Yellow12', 'Green', 'Blue']),
        fact: 'Расстояние между двумя радугами называется темная полоса Александра. Он назван в честь древнегреческого философа Александра Афродисийского, потому что он был первым человеком, описавшим это явление'
    },
    {
        wordsSet: new WordsSet(['Red3', 'Orange3', 'Yellow3', 'Green3']),
        fact: 'В яркую лунную ночь можно наблюдать и радугу от Луны.'
    },
]

export function getWordsSetByIndex(index:number):SequenceInfo {
    return data[index]
}

export function getCount():number {
    return data.length
}