let myChart;
const myChartCtx = document.getElementById('myChart');

let topTenCitiesChartByVacancies
const topTenCitiesChartByVacanciesCtx = document.getElementById('topTenCitiesChart')

let topTenProfessionsChart
const topTenProfessionsChartCtx = document.getElementById('topTenProfessionsChart')

let sourcesChart
const sourcesChartCtx = document.getElementById('sourcesChart')

let topProfessionsBySalaries
const topProfessionsBySalariesCtx = document.getElementById('topProfessionsBySalariesChart')

let year

function updateMyChart() {
    //region Checks
    const avgSalary = document.querySelector('#avgSalary');
    const medianSalary = document.querySelector('#medianSalary');
    const modalSalary = document.querySelector('#modalSalary');

    let avgSalaryData
    let medianSalaryData
    let modalSalaryData

    if (avgSalary === null) {
        avgSalaryData = 0
    } else {
        avgSalaryData = parseInt(avgSalary.innerText.match(/\d+/g)[0] + avgSalary.innerText.match(/\d+/g)[1]);
    }

    if (medianSalary === null) {
        medianSalaryData = 0
    } else {
        medianSalaryData = parseInt(medianSalary.innerText.match(/\d+/g)[0] + medianSalary.innerText.match(/\d+/g)[1]);
    }

    if (modalSalary === null) {
        modalSalaryData = 0
    } else {
        modalSalaryData = parseInt(modalSalary.innerText.match(/\d+/g)[0] + modalSalary.innerText.match(/\d+/g)[1]);
    }
    //endregion


    if (myChart) {
        myChart.destroy(); // Уничтожаем старый график, чтобы создать новый
    }

    myChart = new Chart(myChartCtx, {
        type: 'bar',
        data: {
            labels: ['Статистика'],
            datasets: [
                {
                    label: 'Средняя ЗП',
                    data: [avgSalaryData],
                    borderColor: 'rgb(255, 159, 64)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Медианная ЗП',
                    data: [medianSalaryData],
                    borderColor: 'rgb(255, 205, 86)',
                    backgroundColor: 'rgba(255, 205, 86, 0.2)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Модальная ЗП',
                    data: [modalSalaryData],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

if (localStorage.getItem('year')) {
    document.querySelector('.form-select').value = localStorage.getItem('year')
}

document.querySelector('.form-select').addEventListener('change', function () {
    year = this.value;
    localStorage.setItem('year', year)
    window.location.href = 'http://localhost:8080/statistics?year=' + year;
});

function updateTopTenCitiesByVacanciesChart() {
    if (topTenCitiesChartByVacancies) {
        topTenCitiesChartByVacancies.destroy()
    }

    let values
    let domain
    switch (localStorage.getItem('year')) {
        case '2024':
            values = [1_083_047, 537_334, 247_926, 213_410, 174_376, 164_687, 154_986, 145_080, 142_857, 131_263]
            domain = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Краснодар', 'Челябинск', 'Нижний Новгород', 'Казань', 'Красноярск', 'Ростов-на-Дону']
            break;
        case '2023':
            values = [5_485_679, 2_729_521, 1_335_020, 1_203_627, 1_068_255, 995_776, 970_063, 924_116, 895_377, 849_301]
            domain = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Краснодар', 'Нижний Новгород', 'Челябинск', 'Казань', 'Ростов-на-Дону', 'Уфа']
            break;
        case '2022':
            values = [4_148_262, 2_015_282, 868_671, 853_445, 686_301, 679_913, 624_288, 611_151, 582_435, 567_915]
            domain = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Краснодар', 'Нижний Новгород', 'Казань', 'Красноярск', 'Челябинск', 'Ростов-на-Дону']
            break;
        case '2021':
            domain = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Пермь', 'Краснодар', 'Нижний Новгород', 'Красноярск', 'Казань', 'Ростов-на-Дону']
            values = [5_961_014, 2_658_025, 931_551, 882_728, 704_479, 699_271, 691_425, 641_898, 613_956, 596_227]
            break;
        case '2020':
            domain = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Краснодар', 'Красноярск', 'Челябинск', 'Казань', 'Ростов-на-Дону']
            values = [3_136_625, 1_400_911, 616_749, 602_494, 425_627, 420_821, 404_103, 375_154, 369_199, 360_977]
            break;
        case '2019':
            domain = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Нижний Новгород', 'Краснодар', 'Красноярск', 'Владивосток', 'Ростов-на-Дону', 'Челябинск']
            values = [2_084_454, 756_420, 307_034, 287_357, 218_423, 218_315, 216_727, 214_442, 193_961, 184_936]
            break;
        case '2018':
            domain = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Краснодар', 'Нижний Новгород', 'Казань', 'Ростов-на-Дону', 'Красноярск', 'Уфа']
            values = [1_204_311, 546_684, 169_626, 155_390, 148_153, 141_831, 137_796, 127_852, 120_805, 111_546]
            break;
        case '2017':
            domain = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Краснодар', 'Нижний Новгород', 'Новосибирск', 'Казань', 'Ростов-на-Дону', 'Уфа', 'Самара']
            values = [1_204_311, 546_684, 169_626, 155_390, 148_153, 141_831, 137_796, 127_852, 120_805, 111_546]
            break;
        default:
            values = [1_189_325, 545_909, 169_924, 153_256, 147_497, 139_371, 127_067, 124_939, 110_987, 110_052]
            domain = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Новосибирск', 'Краснодар', 'Челябинск', 'Нижний Новгород', 'Казань', 'Красноярск', 'Ростов-на-Дону']
            break;
    }

    const data = {
        labels: domain,
        datasets: [
            {
                axis: 'y',
                label: ['Количество вакансий'],
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 99, 132)',
                ],
                fill: false,
                borderWidth: 1
            }
        ]
    };

    topTenCitiesChartByVacancies = new Chart(topTenCitiesChartByVacanciesCtx, {
        type: 'bar',
        data,
        options: {
            indexAxis: 'y',
        }
    })
}

function updateTopTenProfessionsPie() {
    if (topTenProfessionsChart) {
        topTenProfessionsChart.destroy()
    }

    let values
    let domain
    switch (localStorage.getItem('year')) {
        case '2024':
            domain = ['Менеджер', 'Водитель', 'Продавец', 'Инженер', 'Оператор', 'Слесарь', 'Менеджер по продажам', 'Кассир', 'Врач', 'Консультант', 'Другие']
            values = [4.7, 4.5, 3.5, 2.6, 2.2, 1.9, 1.8, 1.7, 1.4, 1.4, 74.2]
            break;
        case '2023':
            domain = ['Водитель', 'Менеджер', 'Продавец', 'Оператор', 'Слесарь', 'Инженер', 'Разнорабочий', 'Курьер', 'Комплектовщик', 'Кассир', 'Другие']
            values = [5.7, 3.8, 3.2, 2.7, 2.1, 1.9, 1.7, 1.7, 1.7, 1.6, 73.9]
            break;
        case '2022':
            domain = ['Водитель', 'Менеджер', 'Машинист', 'Продавец', 'Инженер', 'Оператор', 'Слесарь', 'Кассир', 'Менеджер по продажам', 'Врач', 'Другие']
            values = [5.7, 4.0, 3.4, 3.3, 2.3, 2.0, 1.8, 1.6, 1.6, 1.5, 1.5, 72.7]
            break;
        case '2021':
            domain = ['Водитель', 'Менеджер', 'Продавец', 'Инженер', 'Врач', 'Слесарь', 'Машинист', 'Оператор', 'Повар', 'Кассир', 'Другие']
            values = [4.5, 3.8, 3.2, 2.6, 2.4, 2.3, 2.3, 2.2, 1.5, 1.5, 73.5]
            break;
        case '2020':
            domain = ['Менеджер', 'Водитель', 'Продавец', 'Врач', 'Инженер', 'Оператор', 'Слесарь', 'Менеджер по продажам', 'Кассир', 'Консультант', 'Другие']
            values = [4.4, 4.4, 3.3, 2.7, 2.4, 1.9, 1.9, 1.8, 1.6, 1.6, 74.0]
            break;
        case '2019':
            domain = ['Менеджер', 'Водитель', 'Продавец', 'Инженер', 'Кассир', 'Врач', 'Консультант', 'Оператор', 'Грузчик', 'Менеджер по продажам', 'Другие']
            values = [4.4, 4.3, 3.9, 2.2, 2.1, 2.0, 2.0, 2.0, 1.8, 1.8, 73.5]
            break;
        case '2018':
            domain = ['Менеджер', 'Продавец', 'Водитель', 'Оператор', 'Менеджер по продажам', 'Консультант', 'Инженер', 'Кассир', 'Продавец-консультант', 'Повар', 'Другие']
            values = [5.5, 4.0, 3.8, 2.5, 2.3, 2.2, 2.2, 1.9, 1.7, 1.5, 72.4]
            break;
        case '2017':
            domain = ['Менеджер', 'Продавец', 'Водитель', 'Оператор', 'Менеджер по продажам', 'Консультант', 'Инженер', 'Кассир', 'Продавец-консультант', 'Администратор', 'Другие']
            values = [6.6, 3.7, 3.3, 2.6, 2.5, 2.3, 2.1, 1.8, 1.7, 1.4, 72.0]
            break;
        default:
            domain = ['Менеджер', 'Водитель', 'Продавец', 'Инженер', 'Оператор', 'Слесарь', 'Менеджер по продажам', 'Кассир', 'Врач', 'Консультант', 'Другие']
            values = [4.7, 4.5, 3.5, 2.6, 2.2, 1.9, 1.8, 1.7, 1.4, 1.4, 74.2]
            break;
    }


    const data = {
        labels: domain,
        datasets: [{
            label: 'Востребованные профессии ',
            data: values,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(242,64,255)',
                'rgb(153, 102, 255)',
                'rgb(238,255,86)',
                'rgb(103,255,86)',
                'rgb(86,255,196)',
                'rgb(201, 203, 207)',
            ],
            hoverOffset: 1
        }]
    };

    topTenProfessionsChart = new Chart(topTenProfessionsChartCtx, {
        type: 'pie',
        data: data,
    })
}

function updateSourcesPie() {
    if (sourcesChart) {
        sourcesChart.destroy()
    }

    let values
    let domain
    switch (localStorage.getItem('year')) {
        case '2024':
            domain = ['Рабочий персонал', 'Продажи', 'Транспорт, логистика', 'Производство', 'Строительство, недвижимость', 'Инсталляция и сервис', 'Медицина, фармацевтика', 'Туризм, гостиницы, рестораны', 'Бухгалтерия, управленческий учет, финансы предприятия', 'Прочие',]
            values = [17.7, 21.7, 21.1, 10.7, 5.9, 4.5, 4.5, 3.7, 3.2, 1.4, 25]
            break;
        case '2023':
            domain = ['Водитель',  'Менеджер', 'Продавец', 'Оператор', 'Слесарь', 'Инженер', 'Разнорабочий', 'Курьер', 'Комплектовщик', 'Кассир', 'Другие']
            values = [5.7, 3.8, 3.2, 2.7, 2.1, 1.9, 1.7, 1.7, 1.7, 1.6, 73.9]
            break;
        case '2022':
            domain = ['Водитель',  'Менеджер', 'Машинист', 'Продавец', 'Инженер', 'Оператор', 'Слесарь', 'Кассир', 'Менеджер по продажам', 'Врач', 'Другие']
            values = [5.7, 4.0, 3.4, 3.3, 2.3, 2.0, 1.8, 1.6, 1.6, 1.5, 72.7]
            break;
        case '2021':
            domain = ['Водитель',  'Менеджер', 'Продавец', 'Инженер', 'Врач', 'Слесарь', 'Машинист', 'Оператор', 'Повар', 'Кассир', 'Другие']
            values = [4.5, 3.8, 3.2, 2.6, 2.4, 2.3, 2.3, 2.2, 1.5, 1.5, 73.5]
            break;
        case '2020':
            domain = ['Менеджер',  'Водитель', 'Продавец', 'Врач', 'Инженер', 'Оператор', 'Слесарь', 'Менеджер по продажам', 'Кассир', 'Консультант', 'Другие']
            values = [4.4, 4.4, 3.3, 2.7, 2.4, 1.9, 1.9, 1.8, 1.6, 1.6, 74]
            break;
        case '2019':
            domain = ['Менеджер', 'Водитель', 'Продавец', 'Инженер', 'Кассир', 'Врач', 'Консультант', 'Оператор', 'Грузчик', 'Менеджер по продажам', "Другие"]
            values = [4.4, 4.3, 3.9, 2.2, 2.1, 2.0, 2.0, 2.0, 1.8, 1.8, 73.5]
            break;
        case '2018':
            domain = ['Менеджер', 'Продавец','Водитель', 'Оператор', 'Менеджер по продажам', 'Консультант', 'Инженер', 'Кассир', 'Продавец-консультант', 'Повар', 'Другие']
            values = [4.8, 4.2, 4.2, 3.5, 3.4, 2.8, 2.7, 1.9, 1.6, 1.5, 68.4]
            break;
        case '2017':
            domain = ['Рабочий персонал', 'Продажи', 'Производство', 'Транспорт, логистика', 'Административный персонал', 'Строительство и недвижимость', 'Медицина, фармацевтика', 'Информационные технологии', 'Туризм', 'Прочие']
            values = [15.9, 14.4, 8.3, 8.1, 4.7, 4.7, 4.7, 4.3, 3.9, 30.9]
            break;
        default:
            break;
    }

    const data = {
        labels: domain,
        datasets: [{
            label: 'Источники вакансий',
            data: values,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(242,64,255)',
                'rgb(153, 102, 255)',
                'rgb(238,255,86)',
                'rgb(103,255,86)',
                'rgb(86,255,196)',
                'rgb(201, 203, 207)',
            ],
            hoverOffset: 1
        }]
    };
    sourcesChart = new Chart(sourcesChartCtx, {
        type: 'pie',
        data: data,
    })
}

function updateProfessionsBySalariesChart() {
    if (topProfessionsBySalaries) {
        topProfessionsBySalaries.destroy()
    }

    let values
    let domain
    switch (localStorage.getItem('year')) {
        case '2024':
            values = [232_125, 220_781, 210_698, 202_202, 203_262, 180_000, 174_441, 167_685, 160_158]
            domain = ['CTO', 'CIO', 'Военнослужащий', 'Стоматолог-универсал', 'Эксперт по коммерческой недвижимости', 'Программист Navision', 'Руководитель проектов 1С', 'Дальнобойщик', 'Программист Linux']
            break;
        case '2023':
            values = [220_166, 220_000, 211_345, 195_079, 160_109, 159_311, 155_193, 153_912, 150_691, 149_627]
            domain = ['CIO', 'Программист Windows', 'CTO', 'Программист Navision', 'Водитель фуры', 'Руководитель проектов 1С', 'Директор IT', 'Стоматолог-универсал', 'Стоматолог-имплантолог', 'Имплантолог']
            break;
        case '2022':
            values = [204_446, 196_716, 196_117, 182_806, 167_318, 155_053, 152_372, 149_166, 146_333, 141_542]
            domain = ['CIO', 'Актуарий', 'CTO', 'Программист Navision', 'Танцор', 'Программист Java', 'Руководитель проектов 1С', 'Руководитель отдела арбитража', 'Директор IT', 'Директор по закупкам']
            break;
        case '2021':
            domain = ['CTO', 'Актуарий', 'CIO', 'Директор по рекламе', 'Директор по закупкам', 'Директор IT', 'Руководитель отдела арбитража', 'Директор по маркетингу', 'Директор по логистике', 'Программист Navision']
            values = [203_740, 185_416, 174_367, 149_489, 140_739, 139_750, 135_000, 134_093, 134_077, 133_750]
            break;
        case '2020':
            domain = ['CTO', 'Консультант по SAP', 'CIO', 'Директор по рекламе', 'Программист Navision', 'Директор по снабжению', 'Консультант по SAP', 'Директор IT', 'Директор по маркетингу', 'Руководитель проектов 1С']
            values = [159_033, 147_795, 143_564, 131_942, 130_225, 125_377, 120_000, 119_156, 116_704, 115_814]
            break;
        case '2019':
            domain = ['CTO', 'Актуарий', 'Директор IT', 'Программист Navision', 'Консультант по SAP', 'CIO', 'Руководитель проектов 1С', 'Директор по закупкам', 'Директор операционный', 'Директор по маркетингу']
            values = [168_354, 150_000, 120_177, 118_392, 116_834, 116_000, 114_033, 109_250, 105_063, 102_580]
            break;
        case '2018':
            domain = ['CTO', 'Ассистент (Английский)', 'Руководитель отдела арбитража', 'Инженер сопровождения банковских систем', 'CIO', 'Программист Navision', 'Директор по IT', 'Консультант по SAP', 'Директор по закупкам', 'Директор операционный']
            values = [158_927, 149_140, 142_500, 120_000, 117_679, 108_571, 107_695, 106_568, 103_751, 101_134]
            break;
        case '2017':
            domain = ['Руководитель отдела арбитража', 'CIO', 'CTO', 'Руководитель отдела арбитража', 'Программист Navision', 'Эксперт по коммерческой недвижимости', 'Командир воздушного судна', 'Ассистент (английский)', 'Директор по IT', 'Специалист по корпоративному финансированию']
            values = [250_000, 156_250, 151_484, 125_075, 112_166, 108_022, 105_652, 101_020, 98_514, 96_000]
            break;
        default:
            values = [232_125, 220_781, 210_698, 202_202, 203_262, 180_000, 174_441, 167_685, 160_158]
            domain = ['CTO', 'CIO', 'Военнослужащий', 'Стоматолог-универсал', 'Эксперт по коммерческой недвижимости', 'Программист Navision', 'Руководитель проектов 1С', 'Дальнобойщик', 'Программист Linux']
            break;
    }

    const data = {
        labels: domain,
        datasets: [
            {
                axis: 'y',
                label: ['Количество вакансий'],
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 99, 132)',
                ],
                fill: false,
                borderWidth: 1
            }
        ]
    };

    topProfessionsBySalaries = new Chart(topProfessionsBySalariesCtx, {
        type: 'bar',
        data,
        options: {
            indexAxis: 'y',
        }
    })
}

window.addEventListener('load', updateMyChart)
window.addEventListener('load', updateTopTenCitiesByVacanciesChart)
window.addEventListener('load', updateTopTenProfessionsPie)
window.addEventListener('load', updateSourcesPie)
window.addEventListener('load', updateProfessionsBySalariesChart)

