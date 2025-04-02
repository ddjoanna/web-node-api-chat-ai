// 創建 User 節點
CREATE (u1:User { id: 1, name: '阿力', email: 'ali@example.com' });

CREATE (u2:User { id: 2, name: '博安', email: 'boan@example.com' });

CREATE (u3:User { id: 3, name: '昌明', email: 'changming@example.com' });

CREATE (u4:User { id: 4, name: '大衛', email: 'dawei@example.com' });

CREATE (u5:User { id: 5, name: '恩慈', email: 'enci@example.com' });

// 創建 Product 節點
CREATE (p1:Product {id: 101, name: '筆記型電腦', category: '電子產品', price: 1200, link: 'http: //example.com/laptop'});

CREATE (p2:Product {id: 102, name: '耳機', category: '配件', price: 150, link: 'http: //example.com/headphones'});

CREATE (p3:Product {id: 103, name: '咖啡機', category: '家電', price: 80, link: 'http: //example.com/coffeemaker'});

CREATE (p4:Product {id: 104, name: '電子牙刷', category: '個人護理', price: 60, link: 'http: //example.com/toothbrush'});

CREATE (p5:Product {id: 105, name: '智慧手錶', category: '可穿戴設備', price: 200, link: 'http: //example.com/smartwatch'});

// 創建 FAQ 節點
CREATE (f1:FAQ { id: 201, question: '如何重置筆記型電腦？', answer: '按住電源鍵10秒。' });

CREATE (f2:FAQ { id: 202, question: '耳機配對問題？', answer: '確認您的設備已開啟藍牙。' });

CREATE (f3:FAQ { id: 203, question: '如何清潔咖啡機？', answer: '使用醋和水的混合物。' });

CREATE (f4:FAQ { id: 204, question: '電子牙刷電池問題？', answer: '使用前請完整充電。' });

CREATE (f5:FAQ { id: 205, question: '智慧手錶同步問題？', answer: '重新安裝手機上的應用程式。' });

// 創建 Brand 節點
CREATE (b1:Brand { name: '科技世界' });

CREATE (b2:Brand { name: '聲音空間' });

CREATE (b3:Brand { name: '家的舒適' });

CREATE (b4:Brand { name: '關愛公司' });

CREATE (b5:Brand { name: '穿戴科技' });

// 創建 Review 節點
CREATE (r1:Review { id: 301, rating: 5, comment: '非常優秀的產品！' });

CREATE (r2:Review { id: 302, rating: 4, comment: '很好，但有些昂貴' });

CREATE (r3:Review { id: 303, rating: 3, comment: '表現一般' });

CREATE (r4:Review { id: 304, rating: 5, comment: '非常出色且高效' });

CREATE (r5:Review { id: 305, rating: 4, comment: '物超所值' });

// 創建 Order 節點
CREATE (o1:Order { id: 401, total_amount: 1350, date: '2023-01-10' });

CREATE (o2:Order { id: 402, total_amount: 80, date: '2023-02-14' });

CREATE (o3:Order { id: 403, total_amount: 1200, date: '2023-03-05' });

CREATE (o4:Order { id: 404, total_amount: 60, date: '2023-04-21' });

CREATE (o5:Order { id: 405, total_amount: 200, date: '2023-05-30' });

// 創建 SupportTicket 節點
CREATE (s1:SupportTicket { id: 501, issue: '筆記型電腦過熱', response: '確保適當的通風。' });

CREATE (s2:SupportTicket { id: 502, issue: '耳機有靜電噪音', response: '檢查無線干擾。' });

CREATE (s3:SupportTicket { id: 503, issue: '咖啡機無法沖煮', response: '檢查水位和設定。' });

CREATE (s4:SupportTicket { id: 504, issue: '牙刷充電問題', response: '聯繫客服以更換電池。' });

CREATE (s5:SupportTicket { id: 505, issue: '智慧手錶應用程式崩潰', response: '更新至最新版本。' });

// 創建關係
// (User)-[:PURCHASED]->(Product)
MATCH (u1:User { id: 1 }), (p1:Product {id: 101}) CREATE (u1)-[:PURCHASED]->(p1);

MATCH (u2:User { id: 2 }), (p2:Product {id: 102}) CREATE (u2)-[:PURCHASED]->(p2);

MATCH (u3:User { id: 3 }), (p3:Product {id: 103}) CREATE (u3)-[:PURCHASED]->(p3);

MATCH (u4:User { id: 4 }), (p4:Product {id: 104}) CREATE (u4)-[:PURCHASED]->(p4);

MATCH (u5:User { id: 5 }), (p5:Product {id: 105}) CREATE (u5)-[:PURCHASED]->(p5);

// (User)-[:WROTE_REVIEW]->(Review)
MATCH (u1:User { id: 1 }), (r1:Review {id: 301}) CREATE (u1)-[:WROTE_REVIEW]->(r1);

MATCH (u2:User { id: 2 }), (r2:Review {id: 302}) CREATE (u2)-[:WROTE_REVIEW]->(r2);

MATCH (u3:User { id: 3 }), (r3:Review {id: 303}) CREATE (u3)-[:WROTE_REVIEW]->(r3);

MATCH (u4:User { id: 4 }), (r4:Review {id: 304}) CREATE (u4)-[:WROTE_REVIEW]->(r4);

MATCH (u5:User { id: 5 }), (r5:Review {id: 305}) CREATE (u5)-[:WROTE_REVIEW]->(r5);

// (Review)-[:ABOUT]->(Product)
MATCH (r1:Review { id: 301 }), (p1:Product {id: 101}) CREATE (r1)-[:ABOUT]->(p1);

MATCH (r2:Review { id: 302 }), (p2:Product {id: 102}) CREATE (r2)-[:ABOUT]->(p2);

MATCH (r3:Review { id: 303 }), (p3:Product {id: 103}) CREATE (r3)-[:ABOUT]->(p3);

MATCH (r4:Review { id: 304 }), (p4:Product {id: 104}) CREATE (r4)-[:ABOUT]->(p4);

MATCH (r5:Review { id: 305 }), (p5:Product {id: 105}) CREATE (r5)-[:ABOUT]->(p5);

// (Product)-[:BELONGS_TO]->(Brand)
MATCH (p1:Product { id: 101 }), (b1:Brand {name: '科技世界'}) CREATE (p1)-[:BELONGS_TO]->(b1);

MATCH (p2:Product { id: 102 }), (b2:Brand {name: '聲音空間'}) CREATE (p2)-[:BELONGS_TO]->(b2);

MATCH (p3:Product { id: 103 }), (b3:Brand {name: '家的舒適'}) CREATE (p3)-[:BELONGS_TO]->(b3);

MATCH (p4:Product { id: 104 }), (b4:Brand {name: '關愛公司'}) CREATE (p4)-[:BELONGS_TO]->(b4);

MATCH (p5:Product { id: 105 }), (b5:Brand {name: '穿戴科技'}) CREATE (p5)-[:BELONGS_TO]->(b5);

// (User)-[:ASKED]->(FAQ)
MATCH (u1:User { id: 1 }), (f1:FAQ {id: 201}) CREATE (u1)-[:ASKED]->(f1);

MATCH (u2:User { id: 2 }), (f2:FAQ {id: 202}) CREATE (u2)-[:ASKED]->(f2);

MATCH (u3:User { id: 3 }), (f3:FAQ {id: 203}) CREATE (u3)-[:ASKED]->(f3);

MATCH (u4:User { id: 4 }), (f4:FAQ {id: 204}) CREATE (u4)-[:ASKED]->(f4);

MATCH (u5:User { id: 5 }), (f5:FAQ {id: 205}) CREATE (u5)-[:ASKED]->(f5);

// (FAQ)-[:ABOUT]->(Product)
MATCH (f1:FAQ { id: 201 }), (p1:Product {id: 101}) CREATE (f1)-[:ABOUT]->(p1);

MATCH (f2:FAQ { id: 202 }), (p2:Product {id: 102}) CREATE (f2)-[:ABOUT]->(p2);

MATCH (f3:FAQ { id: 203 }), (p3:Product {id: 103}) CREATE (f3)-[:ABOUT]->(p3);

MATCH (f4:FAQ { id: 204 }), (p4:Product {id: 104}) CREATE (f4)-[:ABOUT]->(p4);

MATCH (f5:FAQ { id: 205 }), (p5:Product {id: 105}) CREATE (f5)-[:ABOUT]->(p5);

// (User)-[:CREATED_TICKET]->(SupportTicket)
MATCH (u1:User { id: 1 }), (s1:SupportTicket {id: 501}) CREATE (u1)-[:CREATED_TICKET]->(s1);

MATCH (u2:User { id: 2 }), (s2:SupportTicket {id: 502}) CREATE (u2)-[:CREATED_TICKET]->(s2);

MATCH (u3:User { id: 3 }), (s3:SupportTicket {id: 503}) CREATE (u3)-[:CREATED_TICKET]->(s3);

MATCH (u4:User { id: 4 }), (s4:SupportTicket {id: 504}) CREATE (u4)-[:CREATED_TICKET]->(s4);

MATCH (u5:User { id: 5 }), (s5:SupportTicket {id: 505}) CREATE (u5)-[:CREATED_TICKET]->(s5);

// (SupportTicket)-[:RESOLVED_BY]->(FAQ)
MATCH (s1:SupportTicket { id: 501 }), (f1:FAQ {id: 201}) CREATE (s1)-[:RESOLVED_BY]->(f1);

MATCH (s2:SupportTicket { id: 502 }), (f2:FAQ {id: 202}) CREATE (s2)-[:RESOLVED_BY]->(f2);

MATCH (s3:SupportTicket { id: 503 }), (f3:FAQ {id: 203}) CREATE (s3)-[:RESOLVED_BY]->(f3);

MATCH (s4:SupportTicket { id: 504 }), (f4:FAQ {id: 204}) CREATE (s4)-[:RESOLVED_BY]->(f4);

MATCH (s5:SupportTicket { id: 505 }), (f5:FAQ {id: 205}) CREATE (s5)-[:RESOLVED_BY]->(f5);

// 繼續創建其他隨機連接項，直到達到 300 筆
MATCH (u2:User { id: 2 }), (p3:Product {id: 103}) CREATE (u2)-[:PURCHASED]->(p3);

MATCH (u3:User { id: 3 }), (p4:Product {id: 104}) CREATE (u3)-[:PURCHASED]->(p4);

MATCH (u1:User { id: 1 }), (r2:Review {id: 302}) CREATE (u1)-[:WROTE_REVIEW]->(r2);

MATCH (u4:User { id: 4 }), (r3:Review {id: 303}) CREATE (u4)-[:WROTE_REVIEW]->(r3);

MATCH (u2:User { id: 2 }), (f5:FAQ {id: 205}) CREATE (u2)-[:ASKED]->(f5);

MATCH (f5:FAQ { id: 205 }), (p2:Product {id: 102}) CREATE (f5)-[:ABOUT]->(p2);

MATCH (u3:User { id: 3 }), (s1:SupportTicket {id: 501}) CREATE (u3)-[:CREATED_TICKET]->(s1);

MATCH (s5:SupportTicket { id: 505 }), (f3:FAQ {id: 203}) CREATE (s5)-[:RESOLVED_BY]->(f3);
