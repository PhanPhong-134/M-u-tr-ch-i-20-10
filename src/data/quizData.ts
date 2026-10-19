export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface QuizQuestion {
  id: number;
  subject: string;
  question: string;
  options: Record<OptionKey, string>;
  correct: OptionKey;
}

export interface GiftItem {
  id: string;
  name: string;
  note: string;
  questionCount: number;
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    subject: "Vật lí 11",
    question: "Phương trình vận tốc của vật dao động điều hòa có li độ x = A.cos(ωt + φ) là gì?",
    options: {
      A: "v = ωA.cos(ωt + φ + π/2)",
      B: "v = ωA.sin(ωt + φ)",
      C: "v = -ω²A.cos(ωt + φ)",
      D: "v = A.cos(ωt + φ)"
    },
    correct: "A"
  },
  {
    id: 2,
    subject: "Toán học 11",
    question: "Nêu công thức tổng quát của số hạng thứ n (n ≥ 2) trong một cấp số nhân (u_n) có số hạng đầu u_1 và công bội q (q ≠ 0).",
    options: {
      A: "u_n = u_1 + (n - 1)q",
      B: "u_n = u_1.q^(n - 1)",
      C: "u_n = u_1.q^n",
      D: "u_n = u_1 + (n - 1)d"
    },
    correct: "B"
  },
  {
    id: 3,
    subject: "Tiếng Anh",
    question: "Cấu trúc câu khẳng định của thì Hiện tại hoàn thành (Present Perfect) là gì?",
    options: {
      A: "S + V(s/es) + O",
      B: "S + am/is/are + V-ing + O",
      C: "S + have/has + V3/ed + O",
      D: "S + was/were + V3/ed + O"
    },
    correct: "C"
  },
  {
    id: 4,
    subject: "Toán học 11",
    question: "Nêu công thức nghiệm của phương trình lượng giác cơ bản sin(x) = m (với |m| ≤ 1).",
    options: {
      A: "x = arcsin(m) + k2π (k ∈ Z)",
      B: "x = ±arccos(m) + k2π (k ∈ Z)",
      C: "x = arcsin(m) + kπ (k ∈ Z)",
      D: "x = α + k2π hoặc x = π - α + k2π (k ∈ Z), với sin(α) = m"
    },
    correct: "D"
  },
  {
    id: 5,
    subject: "Vật lí 11",
    question: "Viết công thức tính tần số góc ω của một con lắc lò xo có khối lượng m và độ cứng k.",
    options: {
      A: "ω = √(m / k)",
      B: "ω = √(k / m)",
      C: "ω = 2π√(k / m)",
      D: "ω = k / m"
    },
    correct: "B"
  },
  {
    id: 6,
    subject: "Tiếng Anh",
    question: "Cấu trúc câu bị động (Passive Voice) ở thì Hiện tại đơn (Present Simple) là gì?",
    options: {
      A: "S + am/is/are + V3/ed + (by O)",
      B: "S + have/has + been + V3/ed + (by O)",
      C: "S + was/were + V3/ed + (by O)",
      D: "S + am/is/are + V-ing + (by O)"
    },
    correct: "A"
  },
  {
    id: 7,
    subject: "Toán học 11",
    question: "Nêu công thức tính tổng n số hạng đầu tiên của một cấp số cộng (u_n) theo số hạng đầu u_1 và công sai d.",
    options: {
      A: "S_n = n.u_1 + [n(n - 1)d] / 2",
      B: "S_n = u_1.q^(n - 1)",
      C: "S_n = u_1(1 - q^n) / (1 - q)",
      D: "S_n = n.u_1 + (n - 1)d"
    },
    correct: "A"
  },
  {
    id: 8,
    subject: "Ngữ Văn 11",
    question: "Chi tiết nào trong tác phẩm Chí Phèo của Nam Cao được coi là liều thuốc tiên đánh thức phần 'người' và khơi lại khao khát lương thiện của Chí Phèo?",
    options: {
      A: "Bát cháo hành của Thị Nở",
      B: "Cuộc gặp gỡ với Bá Kiến",
      C: "Những lần say rượu của Chí Phèo",
      D: "Tiếng chửi của Chí Phèo ở đầu tác phẩm"
    },
    correct: "A"
  },
  {
    id: 9,
    subject: "Tin học 11",
    question: "Để tính tổng các giá trị trong một vùng dữ liệu thỏa mãn một điều kiện cho trước trong Excel, ta dùng hàm nào?",
    options: {
      A: "SUM",
      B: "COUNTIF",
      C: "SUMIF",
      D: "AVERAGEIF"
    },
    correct: "C"
  },
  {
    id: 10,
    subject: "Ngữ Văn 11",
    question: "Nhân vật Chí Phèo trước khi bị tha hóa thành 'con quỷ dữ của làng Vũ Đại' vốn làm nghề gì?",
    options: {
      A: "Người nông dân làm thuê (canh điền)",
      B: "Thầy giáo",
      C: "Lý trưởng",
      D: "Bá hộ"
    },
    correct: "A"
  },
  {
    id: 11,
    subject: "Toán học 11",
    question: "Công thức tính tổng n số hạng đầu tiên (S_n) của một cấp số nhân có số hạng đầu u_1 và công bội q (q ≠ 1) là gì?",
    options: {
      A: "S_n = u_1(1 - q^n) / (1 - q)",
      B: "S_n = u_1 + (n - 1)d",
      C: "S_n = u_1.q^(n - 1)",
      D: "S_n = n(u_1 + u_n) / 2"
    },
    correct: "A"
  }
];

export const GIFTS_LIST: GiftItem[] = [
  {
    id: "marine-boy",
    name: "🐬 1 Hộp Marine Boy",
    note: "Bánh cá giòn rụm thơm ngon dành tặng bạn nữ 11A2!",
    questionCount: 1
  },
  {
    id: "xuc-xich",
    name: "🌭 1 Cây Xúc Xích",
    note: "Món ăn vặt siêu cuốn tiếp thêm năng lượng từ các nam sinh 11A2!",
    questionCount: 1
  },
  {
    id: "oreo",
    name: "🍪 1 Gói Oreo",
    note: "Bánh quy kem ngọt ngào như nụ cười của các bạn nữ 11A2!",
    questionCount: 1
  },
  {
    id: "banh-gau",
    name: "🐻 1 Hộp Bánh Gấu",
    note: "Bánh gấu nhân kem thơm lừng, dễ thương như nàng thơ 11A2!",
    questionCount: 1
  },
  {
    id: "bim-bim-lay-to",
    name: "🥔 1 Gói Bim Bim Lay To",
    note: "Snack khoai tây Lay's cỡ lớn giòn tan cực đã dành tặng bạn!",
    questionCount: 1
  },
  {
    id: "bim-bim-swing-to",
    name: "🍟 1 Gói Bim Bim Swing To",
    note: "Gói bim bim Swing cỡ đại đậm vị để cùng chia sẻ niềm vui 20/10!",
    questionCount: 1
  },
  {
    id: "bim-bim-bi-do-to",
    name: "🎃 1 Gói Bim Bim Bí Đỏ To",
    note: "Gói bim bim bí đỏ cỡ lớn giòn ngọt cực kỳ hấp dẫn!",
    questionCount: 1
  },
  {
    id: "sua-milo",
    name: "🧃 1 Hộp Sữa Milo",
    note: "Sữa lúa mạch giàu năng lượng giúp bạn nữ 11A2 luôn rạng rỡ và học tốt!",
    questionCount: 3
  }
];

export const WISHES_LIST: string[] = [
  "💐 Chúc bạn ngày 20/10 luôn tươi tắn, học siêu đỉnh, mãi là đóa hoa rạng ngời của 11A2!",
  "💖 Chúc bạn luôn xinh đẹp, tự tin, thi đạt điểm tuyệt đối mọi môn và luôn ngập tràn niềm vui!",
  "🌷 Chúc bạn có một ngày 20/10 ngọt ngào, nhận được thật nhiều hoa, quà và lời chúc tốt đẹp nhất!",
  "✨ Chúc bạn gái 11A2 tỏa sáng rực rỡ như nắng ban mai, luôn luôn hạnh phúc và yêu đời!",
  "🌺 Cảm ơn bạn vì đã mang đến sự ấm áp và rạng ngời cho đại gia đình 11A2 chúng mình!"
];
