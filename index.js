// express 모듈 불러오기
const express = require("express");

// express 객체 생성
const app = express();

// 기본 포트를 app 객체에 설정
const port = process.env.PORT || 5000;
app.listen(port);

// 미들웨어 함수를 특정 경로에 등록
app.use("/api/data", async function (req, res) {
  console.log("계정 로그인: " + req.query.keyword);
  const resultList = await openBrowser(req.query.keyword, req.query.password);
  //console.log(resultList);
  res.json(resultList);
});

console.log(`server running at http ${port}`);

// puppeteer 모듈 불러오기
const puppeteer = require("puppeteer");

/**
 * 브라우저 오픈 함수
 * @param {string} keyword 검색 키워드
 * @return {Array} 검색 결과
 */
async function openBrowser(keyword, password) {

  let twitter = 0;
  let AllData = [];
  let ura = [9, 15, 45, 49, 60, 73, 80, 92, 95, 100, 109, 118, 135, 139, 140, 149, 150, 153, 154, 156, 160, 163, 164, 178, 181, 184, 187, 200, 202, 203, 218, 221, 222, 231, 253, 254, 256, 264, 266, 270, 271, 272, 273, 274, 275, 276, 277, 278, 283, 284, 309, 310, 324, 348, 357, 361, 366, 368, 371, 399, 400, 402, 403, 405, 414, 417, 422, 425, 433, 447, 448, 451, 470, 478, 480, 481, 482, 487, 493, 504, 506, 507, 511, 519, 520, 537, 539, 551, 553, 579, 580, 606, 626, 645, 646, 648, 652, 664, 671, 676, 681, 683, 689, 700, 711, 716, 717, 721, 730, 735, 736, 741, 771, 775, 776, 793, 795, 804, 811, 816, 819, 824, 831, 834, 842, 845, 856, 866, 868, 876, 882, 884, 898, 911, 920, 926, 936, 938, 951, 954, 956, 958, 959, 960, 972, 981, 993, 997, 1009, 1020, 1027, 1035, 1043, 1046, 1058, 1067, 1072, 1080, 1082, 1084, 1096, 1097, 1111, 1112, 1113];
  let errors = [4, 23, 24, 29, 30, 46, 50, 54, 57, 75, 76, 77, 78, 102, 104, 119, 129, 130, 143, 145, 147, 158, 162, 165, 170, 172, 174, 175, 176, 185, 188, 189, 192, 195, 198, 199, 201, 206, 216, 217, 229, 232, 234, 235, 240, 244, 249, 258, 262, 263, 289, 292, 295, 320, 326, 327, 328, 329, 330, 334, 339, 369, 370, 373, 376, 379, 382, 409, 424, 439, 457, 473, 475, 476, 485, 486, 490, 494, 508, 509, 521, 522, 528, 529, 531, 532, 533, 542, 562, 563, 564, 581, 582, 583, 584, 589, 590, 597, 598, 599, 600, 601, 602, 603, 619, 620, 622, 633, 634, 636, 638, 643, 655, 656, 657, 658, 661, 662, 667, 669, 670, 674, 690, 691, 692, 708, 710, 712, 718, 729, 731, 743, 752, 768, 769, 772, 782, 783, 787, 788, 789, 791, 802, 806, 807, 810, 812, 825, 827, 829, 830, 832, 836, 837, 838, 847, 848, 853, 863, 899, 900, 901, 902, 903, 904, 912, 1001, 1025, 1107];
  const browser = await puppeteer.launch({ headless: true });

  // 브라우저 열기
  const page = await browser.newPage();
  await page.setRequestInterception(true);

  // 페이지 옵션
  page.on('request', (req) => {
    switch (req.resourceType()) {
      case 'stylesheet':
      case 'font':
      case 'image':
        req.abort()
        break;
      default:
        req.continue();
        break;
    }
  });

  // 포탈로 이동
  await page.goto("https://donderhiroba.jp/login.php");

  // 다음 버튼을 클릭
  await page.evaluate(() => {
    const nextBtn = document.querySelector("#login_form > div > img");
    if (nextBtn) {
      nextBtn.click();
    }
  });

  // 예외 처리
  try {
    // 해당 콘텐츠가 로드될 때까지 대기
    await page.waitForSelector("#mail", { timeout: 2000 });

  } catch (error) {
    console.log("에러 발생: " + error);
    return null;
  }

  await page.type("input[id='mail']", keyword);
  await page.type("input[id='pass']", password);

  // 다음 버튼을 클릭
  await page.evaluate(() => {
    const nextBtn = document.querySelector("#btn-idpw-login");
    if (nextBtn) {
      nextBtn.click();
    }
  });

  // 예외 처리
  try {
    // 해당 콘텐츠가 로드될 때까지 대기
    await page.waitForSelector("#form_user1 > div", { timeout: 5000 });

    // 다음 버튼을 클릭
    await page.evaluate(() => {
      const nextBtn = document.querySelector("#form_user1 > div > a > div > div");
      if (nextBtn) {
        nextBtn.click();
      }
    });

  } catch (error) {
    console.log("에러 발생: " + error);
  }

  try {
    // 해당 콘텐츠가 로드될 때까지 대기
    await page.waitForSelector("#content > div.button_area.clearfix > div.mydon_button_area", { timeout: 5000 });
  } catch (error) {
    console.log("로그인 에러");
    twitter = 1;
  }

  if (twitter == 1) {
    await page.evaluate(() => {
      const nextBtn = document.querySelector("#sns-btn-t");
      if (nextBtn) {
        nextBtn.click();
      }
    });

    try {
      // 해당 콘텐츠가 로드될 때까지 대기
      await page.waitForSelector("#username_or_email", { timeout: 2000 });

    } catch (error) {
      console.log("에러 발생: " + error);
      return null;
    }

    await page.type("input[id='username_or_email']", keyword);
    await page.type("input[id='password']", password);

    await page.evaluate(() => {
      const nextBtn = document.querySelector("#allow");
      if (nextBtn) {
        nextBtn.click();
      }
    });

    try {
      // 해당 콘텐츠가 로드될 때까지 대기
      await page.waitForSelector("#form_user1 > div", { timeout: 10000 });

      // 다음 버튼을 클릭
      await page.evaluate(() => {
        const nextBtn = document.querySelector("#form_user1 > div > a > div > div");
        if (nextBtn) {
          nextBtn.click();
        }
      });

    } catch (error) {
      console.log("트위터 에러 발생: " + error);
    }

    try {
      // 해당 콘텐츠가 로드될 때까지 대기
      await page.waitForSelector("#content > div.button_area.clearfix > div.mydon_button_area", { timeout: 5000 });
    } catch (error) {
      console.log("트위터 로그인 에러");
      return null;
    }
  }

  console.log("훙와");

  await page.close();

  let test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  await Promise.all(test.map(async (index) => {
    const pages = await browser.newPage()
    await pages.setRequestInterception(true);

    pages.on('request', (req) => {
      switch (req.resourceType()) {
        case 'stylesheet':
        case 'font':
        case 'image':
          req.abort()
          break;
        default:
          req.continue();
          break;
      }
    });

    for (var i = 1; i <= 120; i++) {
      if (index * 120 + i > 1115) { continue }
      if (errors.indexOf(index * 120 + i) != -1) { continue }

      await pages.goto("https://donderhiroba.jp/score_detail.php?song_no=" + (index * 120 + i) + "&level=4");
      try {
        await pages.waitForSelector("#menu", { timeout: 5000 });
        AllData.push(...(await crawlingData(index * 120 + i)));
      } catch (error) {
        //console.log((index * 120 + i) + " : 으악 에러 발생: " + error);
        //errors.push(i);
      }

      if (ura.indexOf(index * 120 + i) != -1) {
        await pages.goto("https://donderhiroba.jp/score_detail.php?song_no=" + (index * 120 + i) + "&level=5");
        try {
          await pages.waitForSelector("#menu", { timeout: 5000 });
          AllData.push(...(await crawlingData(index * 120 + i + 2000)));
        } catch (error) {
          //console.log((index * 120 + i) + " : 으악 에러 발생: " + error);
          //errors.push(i);
        }
      }
    }

    async function crawlingData(tmp1) {

      const tmp2 = tmp1
      // 호출된 브라우저 영역
      const searchData = await pages.evaluate(() => {

        const song = document.querySelector('#content > div:nth-child(1) > div:nth-child(2) > ul > li > h2');
        const score = document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.high_score > span');
        const times = document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.stage_cnt > span');

        let crown = 0; // Not play

        if (document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.dondaful_combo_cnt > span').textContent !== "0回") { crown = 4 } // 전량
        else if (document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.full_combo_cnt > span').textContent !== "0回") { crown = 3 } // 풀콤
        else if (document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.clear_cnt > span').textContent !== "0回") { crown = 2 } // 클리어
        else if (document.querySelector('#content > div.scoreDetail > div.scoreDetailTable > div.stage_cnt > span').textContent !== "0回") { crown = 1 } // 불클

        return [
          {
            song: song.textContent,
            score: score.textContent,
            crown: crown,
            play_times : times.textContent
          },
        ];
      });

      return [
        {
          id: tmp2,
          song: searchData[0].song,
          score: Number(searchData[0].score.slice(0, -1)),
          crown: searchData[0].crown,
          play_times : Number(searchData[0].play_times.slice(0, -1))
        },
      ];
    }

    console.log(index+": end")
    await pages.close()
  }));

  /**
  * 크롤링 함수
  * @return {Array} 검색 결과
  */

  // 브라우저 닫기
  browser.close();
  console.log("아이스스")

  // 검색결과 반환
  return AllData;
}