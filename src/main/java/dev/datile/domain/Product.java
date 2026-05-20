package dev.datile.domain;

import jakarta.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String articleNumber;

    @Column(nullable = false)
    private String title;

    public Product() {
    }

    public Product(String articleNumber, String title) {
        this.articleNumber = articleNumber;
        this.title = title;
    }

    public Long getId() {
        return id;
    }

    public String getArticleNumber() {
        return articleNumber;
    }

    public void setArticleNumber(String articleNumber) {
        this.articleNumber = articleNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}