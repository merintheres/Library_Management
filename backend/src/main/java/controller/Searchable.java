package model;

import java.util.List;

// Interface - Abstraction concept
public interface Searchable<T> {
    List<T> search(List<T> items, String keyword);
    List<T> search(List<T> items, String keyword, String filterBy);
}
