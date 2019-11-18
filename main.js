let start = function () {
    getClub();
}


let getClub = function () {
    clubDic = {};
    $.ajax({
        url: 'clubList.json',
        type: 'GET',
        dataType: 'json'
    })
        .done(function (data) {
            // 部活のidと名前のjsonを連想配列に
            clubDic = data;
            // 部活のid
            keys = Object.keys(clubDic);
            // json取得後にDOM構築
            makeDOM();
            getId();
            checkProgress();
            preload();
        })
        .fail(function (data) {
            alert('読み込みに失敗しました')
            console.log(data);
        });
}

let preload = function () {
    for (let i = 0; i < keys.length; i++) {
        $(`<img src="img/${keys[i]}.png"`);
        console.log(`preload${keys[i]}`);
    }
}

let makeDOM = function () {
    let rowNum = 3;
    let currentRowNum = 1;

    $('#sheet').append(
        row = $('<tr>')
    );
    for (let i = 0; i < keys.length; i++) {
        if (currentRowNum > rowNum) {
            currentRowNum = 1;
            $('#sheet').append(
                row = $('<tr>')
            );
        }
        currentRowNum++;
        row.append($('<td>')
            .append($(`<p class="text-center">${clubDic[keys[i]]}</p>`))
            .append($('<img>', {
                'src': 'img/none.png',
                'id': keys[i]
            })
            )
        );

    }
}

let getId = function () {
    if (location.search == '') {
        return;
    } else {
        // クエリからid部分を取得
        id = location.search.replace('?id=', '');
        // もうすでに取得済みなら何もしない
        if (localStorage.getItem(id)) {
            return;
        } else {
            // localStorageに進捗を保存
            localStorage.setItem(id, clubDic[id]);
        }
    }
    $(`#${id}`).attr('src', 'img/stamp.png')
    alert(`${clubDic[id]}のスタンプを獲得しました！`)
}

let checkProgress = function () {

    for (let i = 0; i < keys.length; i++) {
        if (localStorage.getItem(keys[i])) {
            $(`#${keys[i]}`).attr('src', `img/${keys[i]}.png`);
        }
    }
}

start();